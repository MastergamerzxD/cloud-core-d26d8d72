import { useState, useEffect, ReactNode } from "react";
import LockScreen from "./LockScreen";

interface PasswordProtectionProps {
  children: ReactNode;
}

const STORAGE_KEY = "cof_unlocked";

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const unlocked = sessionStorage.getItem(STORAGE_KEY) === "true";
    setIsUnlocked(unlocked);
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsUnlocked(true);
  };

  // Show nothing while checking auth state
  if (isUnlocked === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-fire-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return <>{children}</>;
}
