"use client";

import * as React from "react";
import {Baby, Home, Map, Salad, Users} from "lucide-react";
import {NavUser} from "@/components/nav-user";
import Logo from "@/public/images/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {NavMenu} from "./nav-menu";
import {usePathname} from "next/navigation";
import Image from "next/image";

const data = {
  user: {
    name: "super admin",
    email: "superadmin@tanduvia.com",
  },
  projects: [
    {
      name: "Beranda",
      url: "#",
      icon: Home,
    },
    {
      name: "Pengguna",
      url: "/users",
      icon: Users,
    },
    {
      name: "Anak",
      url: "/anak",
      icon: Baby,
    },
    {
      name: "Panduan Gizi",
      url: "/panduan_gizi",
      icon: Salad,
    },
    {
      name: "Pemeriksaan",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <figure className="w-8">
                  <Image src={Logo} alt="Tanduvia Logo" />
                </figure>
                <span className="text-xl font-bold text-[#0366a9]">
                  Tanduvia
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu menu={data.projects} pathNow={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
