"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import React from "react";
import {createUser} from "@/app/actions/users";
import {Spinner} from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {EyeClosed, EyeOffIcon} from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username minimal 2 karakter.",
    })
    .regex(/^\S+$/, "Tidak boleh mengandung spasi!"),
  nama: z.string().min(2, {message: "Nama lengkap minimal 2 karakter"}),
  no_telepon: z.string().min(10, "Nomor telepon tidak boleh kosong!"),
  posyandu_id: z.string("Posyandu tidak boleh kosong!"),
  role: z.enum(
    ["SUPERADMIN", "PETUGAS", "AHLI_GIZI"],
    "Role tidak boleh kosong!",
  ),
  password: z.string().min(8, {message: "Password minimal 8 karakter"}),
});

type PosyanduItem = {
  id: string;
  nama: string;
};

export default function CreateUserForm({posyandu}: {posyandu: PosyanduItem[]}) {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      nama: "",
      no_telepon: "",
      password: "",
      posyandu_id: undefined,
      role: undefined,
    },
  });

  const [isPassword, setIsPassword] = React.useState(true);

  // form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const req = await createUser(values);
      const res = await req;
      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil Membuat Pengguna!");
        push("/pengguna");
      } else {
        toast.warning("Gagal Membuat Pengguna!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi Kegagalan!");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Pengguna Baru</CardTitle>
        <CardDescription>Formulir Pengguna Paru</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form?.formState?.isSubmitting}
                      placeholder="Contoh : alisyaanggraini"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Tidak menggunakan spasi</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nama"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form?.formState?.isSubmitting}
                      placeholder="Contoh : Alisya Anggraini"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_telepon"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form?.formState?.isSubmitting}
                      placeholder="Contoh : 087645679127"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="flex gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        disabled={form?.formState?.isSubmitting}
                        defaultValue={undefined}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PETUGAS">
                            Petugas Posyandu
                          </SelectItem>
                          <SelectItem value="AHLI_GIZI">Ahli Gizi</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="posyandu_id"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Posyandu</FormLabel>
                    <FormControl>
                      <Select
                        disabled={form?.formState?.isSubmitting}
                        defaultValue={undefined}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Posyandu" />
                        </SelectTrigger>
                        <SelectContent>
                          {posyandu?.map(({id, nama}) => (
                            <SelectItem key={id} value={id}>
                              {nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        disabled={form?.formState?.isSubmitting}
                        {...field}
                        placeholder="Masukan Password"
                        type={isPassword ? "password" : "text"}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          disabled={form?.formState?.isSubmitting}
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
            <div className="space-x-5 text-end">
              <Button
                onClick={() => push("/pengguna")}
                disabled={form.formState.isSubmitting}
                variant={"ghost"}
                className="border"
                type="reset">
                Batal
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner />}Tambah
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
