"use client";

import {FileText, type LucideIcon} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMenu({
  menu,
  pathNow,
}: {
  menu: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  pathNow: string;
}) {
  return (
    // className="group-data-[collapsible=icon]:hidden"
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {menu.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={pathNow == item.url}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a
              href="/docs/Tanduvia-User-Guide-Staff.pdf"
              download="Buku_Panduan_Tanduvia_Staff.pdf">
               <FileText className="h-4 w-4" /> Unduh Buku Panduan
              </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
