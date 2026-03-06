import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TRACK_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`;

function getSessionId() {
  let sid = sessionStorage.getItem("cof_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("cof_sid", sid);
  }
  return sid;
}

export default function VisitorTracker() {
  const location = useLocation();
  const navigate = useNavigate();
  const lastPage = useRef("");

  const send = async (page: string) => {
    try {
      const resp = await fetch(TRACK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          session_id: getSessionId(),
          page,
          referrer: document.referrer || null,
          screen_width: window.innerWidth,
          user_agent: navigator.userAgent,
        }),
      });
      if (resp.status === 403) {
        // IP is blocked - show blocked page
        const data = await resp.json();
        if (data.blocked) {
          document.documentElement.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#111;color:#fff;font-family:sans-serif;text-align:center">
              <div>
                <h1 style="font-size:2rem;margin-bottom:1rem">Access Restricted</h1>
                <p style="color:#999">Your access to this website has been restricted.</p>
                <p style="color:#666;margin-top:0.5rem;font-size:0.875rem">If you believe this is an error, please contact support at hello@cloudonfire.com</p>
              </div>
            </div>`;
        }
      }
    } catch {}
  };

  useEffect(() => {
    const page = location.pathname;
    if (page === lastPage.current) return;
    lastPage.current = page;
    if (page.startsWith("/admin")) return;

    const t = setTimeout(() => send(page), 500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Heartbeat every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const page = location.pathname;
      if (page.startsWith("/admin")) return;
      send(page);
    }, 30000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  return null;
}
