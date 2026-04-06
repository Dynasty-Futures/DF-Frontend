import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 relative z-[1]">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
