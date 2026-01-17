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

const dataAdmin = {
  user: {
    name: "super admin",
    email: "Superadmin",
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

const dataPetugas = {
  user: {
    name: "Aridiansyah",
    email: "Petugas Posyandu",
  },
  projects: [
    {
      name: "Beranda",
      url: "#",
      icon: Home,
    },
    {
      name: "Anak",
      url: "/anak",
      icon: Baby,
    },
    {
      name: "Pemeriksaan",
      url: "#",
      icon: Map,
    },
  ],
};

const dataAhliGizi = {
  user: {
    name: "Dr. Aridiansyah",
    email: "Ahli Gizi",
  },
  projects: [
    {
      name: "Beranda",
      url: "#",
      icon: Home,
    },
    {
      name: "Panduan Gizi",
      url: "/panduan_gizi",
      icon: Salad,
    },
  ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const role = "SUPERADMIN"

  const navigation = role === "SUPERADMIN" ? dataAdmin : role === "PETUGAS" ? dataPetugas : dataAhliGizi
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
        <NavMenu menu={navigation.projects} pathNow={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigation.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
