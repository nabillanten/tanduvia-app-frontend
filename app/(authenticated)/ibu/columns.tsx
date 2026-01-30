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
import {CircleCheckIcon, CircleXIcon, EllipsisIcon, Plus} from "lucide-react";
import {DeleteIbu} from "@/app/actions/ibu";
import {id} from "date-fns/locale";

export const schema = z.object({
  id: z.string(),
  nik: z.string(),
  nama: z.string(),
  alamat: z.string(),
  no_telepon: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.string(),
  jenis_kelamin: z.string(),
  is_active: z.boolean(),
  created_at: z.date(),
});

const AddAnakButton = (props: z.infer<typeof schema>) => {
  const {push} = useRouter();
  const {id} = props;
  return (
    <Button onClick={() => push(`/ibu/${id}/anak/create`)}>
      <Plus /> Anak
    </Button>
  );
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
          <DropdownMenuItem onSelect={() => push(`/ibu/update/${id}`)}>
            Ubah
          </DropdownMenuItem>
          <DropdownMenuItem
            variant={"destructive"}
            onClick={() => setShowDialog(true)}>
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan menghapus ibu dengan nama {nama}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await DeleteIbu(id);
                  toast.success("Berhasil menghapus ibu!");
                } catch (error) {
                  console.log(error);
                  toast.error("Gagal menghapus ibu!");
                }
              }}
              className={buttonVariants({
                variant: "destructive",
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
    accessorKey: "no_telepon",
    header: "Nomor Telepon",
  },

  {
    accessorKey: "tempat_lahir",
    header: "Tempat Lahir",
  },
  {
    accessorKey: "tanggal_lahir",
    header: "Tanggal Lahir",
    cell: ({row}) => {
      const date = format(row.getValue("tanggal_lahir"), "dd MMMM yyyy", {
        locale: id,
      });
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
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "action_button",
    header: "",
    cell: ({row}) => {
      return <Actions {...row.original} />;
    },
  },
  {
    accessorKey: "addAnak",
    header: "",
    cell: ({row}) => {
      return <AddAnakButton {...row.original} />;
    },
  },
];
