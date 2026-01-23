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
import {useRouter} from "next/navigation";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  EllipsisIcon,
} from "lucide-react";
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
import {toast} from "sonner";
import {DeletePanduanGizi} from "@/app/actions/panduangizi";

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
  const [showDialog, setShowDialog] = React.useState(false);
  const {id, judul} = props;

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
            onSelect={() => push(`/rekomendasi_gizi/update/${id}`)}>
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
              Anda akan menghapus rekomendasi gizi &quot;{judul}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  DeletePanduanGizi(id);
                  toast.success("Berhasil menghapus rekomendasi gizi!");
                } catch (error) {
                  console.log(error);
                  toast.error("Gagal menghapus rekomendasi gizi!");
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
    accessorKey: "judul",
    header: "Judul",
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
    header: "Usia Minimal",
    cell: ({row}) => {
      const usia_min = row.original.usia_min;
      return <p>{usia_min} bulan</p>;
    },
  },
  {
    accessorKey: "usia_max",
    header: "Usia Maksimal",
    cell: ({row}) => {
      const usia_max = row.original.usia_max;
      return <p>{usia_max} bulan</p>;
    },
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
