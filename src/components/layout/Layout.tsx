import { ReactNode, lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBanner from "./AnnouncementBanner";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import GlobalSEO from "@/components/GlobalSEO";
import PublicChatWidget from "@/components/PublicChatWidget";
import VisitorTracker from "@/components/VisitorTracker";

const AIChatHighlight = lazy(() => import("@/components/AIChatHighlight"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalSEO />
      <AnimatedBackground />
      <Navbar />
      <AnnouncementBanner />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <PublicChatWidget />
      <Suspense fallback={null}><AIChatHighlight /></Suspense>
      <VisitorTracker />
    </div>
  );
}
