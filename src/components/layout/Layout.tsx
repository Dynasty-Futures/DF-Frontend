import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundScene from "@/components/ui/aurora-section-hero";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global premium animated background — single fixed layer behind all pages */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, #0d0d0d 45%, #111111 100%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <BackgroundScene beamCount={18} />
      </div>
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 relative z-[1]">{children}</main>
      {!hideFooter && (
        <div className="relative z-[1]">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
