import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Marquee from "./Marquee";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
