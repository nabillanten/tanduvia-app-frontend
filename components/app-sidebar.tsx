"use client";

import * as React from "react";
import {Baby, Home, Map, PersonStanding, Salad, Users} from "lucide-react";
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
import Link from "next/link";

export function AppSidebar({
  name,
  userRole,
  ...props
}: React.ComponentProps<typeof Sidebar> & {name: string; userRole: string}) {
  const pathname = usePathname();

  const dataAdmin = {
    user: {
      name: name,
      role: userRole,
    },
    projects: [
      {
        name: "Beranda",
        url: "/dashboard",
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
        name: "Ibu",
        url: "/ibu",
        icon: PersonStanding,
      },
      {
        name: "Posyandu",
        url: "/posyandu",
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
      name: name,
      role: userRole,
    },
    projects: [
      {
        name: "Beranda",
        url: "/dashboard",
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
      name: name,
      role: userRole,
    },
    projects: [
      {
        name: "Beranda",
        url: "/dashboard",
        icon: Home,
      },
      {
        name: "Panduan Gizi",
        url: "/panduan_gizi",
        icon: Salad,
      },
    ],
  };

  const navigation =
    userRole === "SUPERADMIN"
      ? dataAdmin
      : userRole === "PETUGAS"
        ? dataPetugas
        : dataAhliGizi;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard">
                <figure className="w-8">
                  <Image src={Logo} alt="Tanduvia Logo" />
                </figure>
                <span className="text-xl font-bold text-[#0366a9]">
                  Tanduvia
                </span>
              </Link>
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
