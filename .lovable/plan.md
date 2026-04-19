
The user wants the 24h maintenance countdown to be **global** (same for all users worldwide), not per-browser. Currently it uses `localStorage` which means each visitor sees their own 24h timer starting from their first visit.

I need a single shared end timestamp that everyone counts down to. Options:
1. Hardcode a fixed end timestamp in the component (simplest, no backend)
2. Store in Supabase site_settings (configurable, but adds query)
3. Use an env/config constant

Best approach: hardcode a fixed UTC timestamp constant. Simple, instant, no DB lookups, identical for every visitor. Since the user said "24h", I'll set the end time to roughly 24h from now in UTC. They can edit the constant later if needed.

## Plan

**Goal:** Make the maintenance countdown a single global timer — every visitor sees the exact same remaining time, ticking down to one shared end moment.

**Change:** Update `src/components/MaintenancePopup.tsx`:
- Remove the `localStorage`-based per-user end time logic (`STORAGE_KEY`, `getEndTime()`).
- Replace with a single hardcoded UTC end timestamp constant, e.g.:
  ```
  const MAINTENANCE_END_UTC = Date.parse("2026-04-20T18:30:00Z");
  ```
  (≈ 24h from now, IST ~midnight April 21).
- Countdown computes `MAINTENANCE_END_UTC - Date.now()` so every visitor on Earth sees the same hours/minutes/seconds.
- When the timer hits zero, the countdown shows `00:00:00` (popup still appears since the billing panel is still being intercepted — extending the window later is just changing the constant).

**Why hardcoded constant (not DB):**
- Zero latency, no extra Supabase call on every page load.
- Truly global — same value rendered for everyone.
- Easy to extend: edit one line if maintenance runs longer.

**Optional (only if you want):** I can instead store the end time in the existing `site_settings` table so you can update it from the admin panel without a redeploy. Tell me if you'd prefer that — otherwise I'll go with the hardcoded constant.

**Files touched:** `src/components/MaintenancePopup.tsx` (only).
