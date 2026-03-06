import { useState, useEffect, createContext, useContext, ReactNode, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthContext {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  needs2FA: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null; needs2FA?: boolean }>;
  verify2FA: (code: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  logActivity: (action: string, details?: string) => Promise<void>;
}

const AuthContext = createContext<AdminAuthContext | null>(null);

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [needs2FA, setNeeds2FA] = useState(false);
  const [pending2FAUser, setPending2FAUser] = useState<User | null>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout>>();

  const checkAdmin = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    } catch {
      return false;
    }
  };

  const logActivity = useCallback(async (action: string, details?: string) => {
    try {
      const ua = navigator.userAgent;
      await supabase.from("admin_activity_logs").insert({
        user_id: user?.id || pending2FAUser?.id || "unknown",
        email: user?.email || pending2FAUser?.email || "unknown",
        action,
        details,
        browser: ua.substring(0, 200),
      });
    } catch { /* silent */ }
  }, [user, pending2FAUser]);

  // Inactivity auto-logout
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (user && isAdmin) {
      inactivityTimer.current = setTimeout(async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsAdmin(false);
      }, INACTIVITY_TIMEOUT);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (!user || !isAdmin) return;
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handler = () => resetInactivityTimer();
    events.forEach(e => window.addEventListener(e, handler));
    resetInactivityTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, handler));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [user, isAdmin, resetInactivityTimer]);

  useEffect(() => {
    let mounted = true;
    let authRequestId = 0;

    const applyAuthState = (u: User | null) => {
      const currentRequest = ++authRequestId;
      setUser(u);

      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      void checkAdmin(u.id)
        .then((admin) => {
          if (!mounted || currentRequest !== authRequestId) return;
          setIsAdmin(admin);
        })
        .catch(() => {
          if (!mounted || currentRequest !== authRequestId) return;
          setIsAdmin(false);
        })
        .finally(() => {
          if (!mounted || currentRequest !== authRequestId) return;
          setLoading(false);
        });
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      applyAuthState(session?.user ?? null);
    });

    void supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        applyAuthState(session?.user ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      });

    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 7000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const checkLoginRateLimit = async (email: string): Promise<string | null> => {
    const cutoff = new Date(Date.now() - LOCKOUT_DURATION).toISOString();
    const { data: attempts } = await supabase
      .from("login_attempts")
      .select("id")
      .eq("email", email)
      .eq("success", false)
      .gte("created_at", cutoff);

    if (attempts && attempts.length >= MAX_LOGIN_ATTEMPTS) {
      return `Too many failed login attempts. Please try again in ${LOCKOUT_DURATION / 60000} minutes.`;
    }
    return null;
  };

  const recordLoginAttempt = async (email: string, success: boolean) => {
    await supabase.from("login_attempts").insert({ email, success });
  };

  const signIn = async (email: string, password: string) => {
    // Check rate limit
    const rateLimitError = await checkLoginRateLimit(email);
    if (rateLimitError) {
      await supabase.from("admin_activity_logs").insert({
        user_id: "unknown", email, action: "login_blocked",
        details: "Rate limited due to too many failed attempts",
      });
      return { error: rateLimitError };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      await recordLoginAttempt(email, false);
      await supabase.from("admin_activity_logs").insert({
        user_id: "unknown", email, action: "login_failed",
        details: error.message, browser: navigator.userAgent.substring(0, 200),
      });
      return { error: error.message };
    }

    const signedInUser = data.user;
    if (!signedInUser) return { error: "Unable to validate your account." };

    const admin = await checkAdmin(signedInUser.id);
    if (!admin) {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      await recordLoginAttempt(email, false);
      return { error: "This account does not have admin access." };
    }

    // Check if 2FA is enabled
    try {
      const { data: totpResult } = await supabase.functions.invoke("admin-totp", {
        body: { action: "check_user", userId: signedInUser.id },
      });

      if (totpResult?.twoFactorEnabled) {
        setPending2FAUser(signedInUser);
        setNeeds2FA(true);
        // Don't set isAdmin yet - wait for 2FA verification
        return { error: null, needs2FA: true };
      }
    } catch { /* 2FA check failed, proceed without */ }

    await recordLoginAttempt(email, true);
    setIsAdmin(true);
    await supabase.from("admin_activity_logs").insert({
      user_id: signedInUser.id, email, action: "login_success",
      browser: navigator.userAgent.substring(0, 200),
    });
    return { error: null };
  };

  const verify2FA = async (code: string) => {
    if (!pending2FAUser) return { error: "No pending authentication." };

    try {
      const { data: result } = await supabase.functions.invoke("admin-totp", {
        body: { action: "verify", code, userId: pending2FAUser.id },
      });

      if (!result?.valid) {
        return { error: "Invalid authenticator code. Please try again." };
      }

      setNeeds2FA(false);
      setIsAdmin(true);
      setPending2FAUser(null);
      await recordLoginAttempt(pending2FAUser.email || "", true);
      await supabase.from("admin_activity_logs").insert({
        user_id: pending2FAUser.id, email: pending2FAUser.email,
        action: "login_success_2fa",
        browser: navigator.userAgent.substring(0, 200),
      });
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "2FA verification failed." };
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (user) {
      await supabase.from("admin_activity_logs").insert({
        user_id: user.id, email: user.email, action: "logout",
        browser: navigator.userAgent.substring(0, 200),
      });
    }
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setNeeds2FA(false);
    setPending2FAUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, needs2FA, signIn, verify2FA, signUp, signOut, logActivity }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
