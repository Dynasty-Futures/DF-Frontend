import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AtmosphericBackground from "./AtmosphericBackground";
import { getPerfFlags } from "@/lib/perfFlags";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  const isMobile = useIsMobile();
  const { noAtmosphere } = getPerfFlags();
  const disableAtmosphere = noAtmosphere || isMobile;

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {!disableAtmosphere && <AtmosphericBackground />}
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 relative z-[1]">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
