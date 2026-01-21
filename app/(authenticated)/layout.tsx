import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";
import {appConfig} from "../app-config";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Layout({children}: {children: React.ReactNode}) {
  const cookie = await cookies();
  const access_token = cookie.get("access_token")?.value;
  let role;
  let name;
  let decodedJWT;
  try {
    decodedJWT = jwtDecode<{id: string}>(access_token as string);
  } catch (error) {}

  try {
    const req = await fetch(appConfig.baseUrl + "/users/" + decodedJWT?.id, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    const res = await req.json();
    role = res?.data?.role;
    name = res?.data?.nama;
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 52)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }>
        <AppSidebar userRole={role as string} name={name} />
        <SidebarInset>
          <Breadcrumbs/>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="p-4">{children}</div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
