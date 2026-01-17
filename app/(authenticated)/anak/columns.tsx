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
import {Button, buttonVariants} from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {CircleCheckIcon, CircleXIcon, EllipsisIcon} from "lucide-react";

export const JenisKelaminEnum = z.enum(["L", "P"]);
export const schema = z.object({
  id: z.string(),
  rfid_tag: z.string(),
  nik: z.string(),
  nama: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.string(),
  jenis_kelamin: z.string(),
  is_active: z.boolean(),
  created_at: z.date(),
});

const jenisKelaminLabel: Record<string, string> = {
  L: "Laki-Laki",
  P: "Perempuan",
};

const Actions = (props: z.infer<typeof schema>) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const {push} = useRouter();
  const {id, nama, is_active} = props;

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
          <DropdownMenuItem
            variant={is_active ? "destructive" : "default"}
            onClick={() => setShowDialog(true)}>
            {is_active ? " Nonaktifkan" : "Aktifkan"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan {is_active ? "menonaktifkan" : "mengaktifkan"} pengguna
              dengan nama {nama}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  toast.success("Berhasil memperbarui status pengguna!");
                } catch (error) {
                  console.log(error);
                  toast.error("Gagal memperbarui status pengguna!");
                }
              }}
              className={buttonVariants({
                variant: is_active ? "destructive" : "default",
              })}>
              Yakin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "rfid_tag",
    header: "RFID Tag",
  },
  {
    accessorKey: "tempat_lahir",
    header: "Tempat Lahir",
  },
  {
    accessorKey: "tanggal_lahir",
    header: "Tanggal Lahir",
     cell: ({row}) => {
      const date = format(row.getValue("tanggal_lahir"), "MMM d, yyyy");
      return date;
    },
  },
  {
    accessorKey: "jenis_kelamin",
    header: "Jenis Kelamin",
    cell: ({row}) => {
      const jenis_kelamin = row.original.jenis_kelamin;
      return <p>{jenisKelaminLabel[jenis_kelamin] || jenis_kelamin}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({row}) => {
      const date = format(row.getValue("createdAt"), "MMM d, yyyy");
      return date;
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({row}) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.is_active === true ? (
          <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
        ) : (
          <CircleXIcon className="fill-red-500 dark:fill-red-400" />
        )}
        {row.original.is_active ? "Aktif" : "Non-Aktif"}
      </Badge>
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
