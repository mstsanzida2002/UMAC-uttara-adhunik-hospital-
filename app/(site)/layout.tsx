import type { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { SiteDataProvider } from "@/context/SiteDataContext";

/**
 * Public site layout — wraps every public page with the shared chrome
 * and real-time SiteDataProvider for instant updates of content and images.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDataProvider>
      <div className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SiteDataProvider>
  );
}