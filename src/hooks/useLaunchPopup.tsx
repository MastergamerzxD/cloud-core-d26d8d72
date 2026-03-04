import { useState, createContext, useContext } from "react";
import LaunchPopup from "@/components/LaunchPopup";

const LaunchPopupContext = createContext<{ openPopup: () => void }>({ openPopup: () => {} });

export function LaunchPopupProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LaunchPopupContext.Provider value={{ openPopup: () => setOpen(true) }}>
      {children}
      <LaunchPopup open={open} onOpenChange={setOpen} />
    </LaunchPopupContext.Provider>
  );
}

export function useLaunchPopup() {
  return useContext(LaunchPopupContext);
}
