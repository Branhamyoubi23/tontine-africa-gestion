
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isMobile = useIsMobile();

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <main className={cn(
          "flex-1 bg-gray-50 overflow-auto transition-all duration-200", 
          isMobile ? "p-3" : "p-4 md:p-6"
        )}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default MainLayout;
