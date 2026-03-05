import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthContext {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AdminAuthContext | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { error: error.message };

    const signedInUser = data.user;
    if (!signedInUser) return { error: "Unable to validate your account." };

    const admin = await checkAdmin(signedInUser.id);
    if (!admin) {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      return { error: "This account does not have admin access." };
    }

    setIsAdmin(true);
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
