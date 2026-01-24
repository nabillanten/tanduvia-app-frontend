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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {
  CircleCheckIcon,
  CircleXIcon,
  EllipsisIcon,
  EyeClosed,
  EyeOffIcon,
} from "lucide-react";
import {changePassword, updateUser} from "@/app/actions/users";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PosyanduSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  nama_posyandu: z.string(),
  alamat: z.string().nullable(),
});

export const RoleEnum = z.enum(["super_admin", "petugas", "ahli_gizi"]);
export const schema = z.object({
  id: z.string(),
  nama: z.string(),
  no_telepon: z.string().nullable(),
  role: z.string(),
  created_at: z.date(),
  username: z.string(),
  is_active: z.boolean(),
  posyandu: PosyanduSchema.nullable(),
});

const roleLabels: Record<string, string> = {
  SUPERADMIN: "Super Admin",
  PETUGAS: "Petugas",
  AHLI_GIZI: "Ahli Gizi",
};

const formSchema = z.object({
  password: z.string().min(8, {message: "Password minimal 8 karakter!"}),
});

const Actions = (props: z.infer<typeof schema>) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(true);
  const [showDialogChangePassword, setShowDialogChangePassword] =
    React.useState(false);
  const {push} = useRouter();
  const {id, nama, is_active} = props;
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {password: ""},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values?.password?.length >= 8) {
      try {
        const req = await changePassword(id, values);
        const res = await req;

        if (res?.statusCode === 201 || res?.statusCode === 200) {
          toast.success("Berhasil Mengubah Password Pengguna!");
          form.resetField("password");
          setShowDialogChangePassword(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Gagal Mengubah Password Pengguna!");
      }
    } else {
      toast.error("Password minimal 8 karakter!");
    }
  };

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
          <DropdownMenuItem onSelect={() => push(`/pengguna/update/${id}`)}>
            Ubah
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setShowDialogChangePassword((prevState) => !prevState)
            }>
            Ganti Password
          </DropdownMenuItem>
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
                  updateUser(id, {is_active: !is_active});
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
      <Form {...form}>
        <Dialog
          open={showDialogChangePassword}
          onOpenChange={setShowDialogChangePassword}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent className="sm:max-w-[480px]">
              <form className="space-y-6">
                <DialogHeader>
                  <DialogTitle>Ubah Password</DialogTitle>
                  <DialogDescription>
                    Formulir ubah password pengguna dengan nama {nama}
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password Baru</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            placeholder="Masukan Password Baru"
                            type={isPassword ? "password" : "text"}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              size="icon-xs"
                              onClick={() => {
                                setIsPassword((prev) => !prev);
                              }}>
                              {true ? <EyeOffIcon /> : <EyeClosed />}
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      disabled={form.formState.isSubmitting}
                      variant="outline">
                      Batal
                    </Button>
                  </DialogClose>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                    Simpan
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </form>
        </Dialog>
      </Form>
    </>
  );
};

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "no_telepon",
    header: "Nomor Telepon",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({row}) => {
      const role = row.original.role;
      return <p>{roleLabels[role] || role}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({row}) => {
      const date = format(row.getValue("created_at"), "MMM d, yyyy");
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
    accessorKey: "posyandu.nama",
    header: "Posyandu",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({row}) => {
      return <Actions {...row.original} />;
    },
  },
];
