"use client";
import z from "zod";
import {type ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  EllipsisIcon,
} from "lucide-react";

export const schema = z.object({
  id: z.string(),
  judul: z.string(),
  deskripsi: z.string(),
  usia_min: z.number(),
  usia_max: z.number(),
  jenis_indeks: z.string(),
  target_status: z.string(),
  catatan_admin: z.string().nullable(),
  status: z.string(),
  created_at: z.date(),
});

const Actions = (props: z.infer<typeof schema>) => {
  const {push} = useRouter();
  const {id} = props;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon">
            <EllipsisIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={() => push(`/panduan_gizi/update/${id}`)}>
            Ubah
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "judul",
    header: "Title",
  },
  {
    accessorKey: "jenis_indeks",
    header: "Jenis Index",
  },
  {
    accessorKey: "target_status",
    header: "Target Status",
  },
  {
    accessorKey: "usia_min",
    header: "Usia Minimal (bulan)",
  },
  {
    accessorKey: "usia_max",
    header: "Usia Maksimal (bulan)",
  },

  {
    accessorKey: "created_at",
    header: "Tanggal Diupload",
    cell: ({row}) => {
      const date = format(row.getValue("created_at"), "MMM d, yyyy");
      return date;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <>
        {row.original.status === "published" ? (
          <Badge className="bg-green-100 text-green-900">
            <CircleCheckIcon /> Published
          </Badge>
        ) : row?.original.status === "pending" ? (
          <Badge className="bg-yellow-100 text-yellow-800">
            <CircleAlertIcon /> Pending
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800">
            <CircleXIcon /> Rejected
          </Badge>
        )}
      </>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({row}) => {
      return <Actions {...row.original} />;
    },
  },
];
