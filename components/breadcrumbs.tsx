"use client";
import React from "react";
import {SidebarTrigger} from "./ui/sidebar";
import {Separator} from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {usePathname} from "next/navigation";

type Props = object;

const LABEL_MAP: Record<string, string> = {
  create: "Tambah Baru",
  update: "Ubah Data",
};

const isUUID = (str: string) => {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(str);
};

const Breadcrumbs = (props: Props) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getLabel = (segment: string) => {
    if (isUUID(segment)) return "Detail";
    if (LABEL_MAP[segment]) return LABEL_MAP[segment];

    // UPDATED: Handle dash (-) dan underscore (_)
    return segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join("/")}`;
              const isLast = index === segments.length - 1;
              const label = getLabel(segment);

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href={"#"}>{label}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Breadcrumbs;
