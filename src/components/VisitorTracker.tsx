import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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
  const lastPage = useRef("");

  useEffect(() => {
    const page = location.pathname;
    if (page === lastPage.current) return;
    lastPage.current = page;

    // Skip admin pages
    if (page.startsWith("/admin")) return;

    const send = () => {
      fetch(TRACK_URL, {
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
      }).catch(() => {});
    };

    // Small delay to not block rendering
    const t = setTimeout(send, 500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Heartbeat every 30s to keep "last_seen_at" fresh
  useEffect(() => {
    const interval = setInterval(() => {
      const page = location.pathname;
      if (page.startsWith("/admin")) return;
      fetch(TRACK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          session_id: getSessionId(),
          page,
          screen_width: window.innerWidth,
          user_agent: navigator.userAgent,
        }),
      }).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  return null;
}
