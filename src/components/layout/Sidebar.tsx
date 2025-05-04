
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  Users, 
  CreditCard as PaymentIcon, 
  BarChart2, 
  LogOut, 
  FileText, 
  Settings
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    {
      label: "Tableau de bord",
      icon: BarChart2,
      path: "/dashboard"
    },
    {
      label: "Membres",
      icon: Users,
      path: "/membres"
    },
    {
      label: "Cotisations",
      icon: PaymentIcon,
      path: "/cotisations"
    },
    {
      label: "Prêts",
      icon: FileText,
      path: "/prets"
    },
    {
      label: "Paramètres",
      icon: Settings,
      path: "/parametres"
    }
  ];

  const handleLogout = () => {
    // Déconnexion logique à implémenter
    window.location.href = "/login";
  };

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4">
        <div className="flex items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Tontine Africa</h2>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'bg-sidebar-primary font-medium' : ''}`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-red-200">
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
