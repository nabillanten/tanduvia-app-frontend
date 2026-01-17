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
import Link from "next/link";
import {getCookie} from "@/lib/cookies";
import {appConfig} from "@/app/app-config";

type User = {
  id: string;
  nama: string;
  role: string;
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    const getPosyandu = async () => {
      try {
        const access_token = getCookie("access_token");
        const userId = getCookie("userId");
        const request = await fetch(appConfig.baseUrl + "/users/" + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          cache: "no-store",
        });
        const response = await request.json();
        setUser(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosyandu();
  }, []);

  const dataAdmin = {
    user: {
      name: user?.nama,
      role: user?.role,
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
      name: user?.nama,
      role: user?.role,
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
      name: user?.nama,
      role: user?.role,
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

  const role = user?.role;

  const navigation =
    role === "SUPERADMIN"
      ? dataAdmin
      : role === "PETUGAS"
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
