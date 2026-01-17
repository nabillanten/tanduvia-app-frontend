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
import {updateUser} from "@/app/actions/users";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username minimal 2 karakter.",
  }),
  nama: z.string().min(2, {message: "Nama lengkap minimal 2 karakter"}),
  // no_telepon: z.string().min(10),
  posyandu_id: z.string().nonempty({message: "Posyandu tidak boleh kosong!"}),
  role: z.enum(["SUPERADMIN", "PETUGAS", "AHLI_GIZI"], {
    message: "Role tidak boleh kosong!",
  }),
  password: z.string().optional(),
});

export default function UpdateUserForm({
  userId,
  user,
  posyandu,
}: {
  userId: string;
  user: z.infer<typeof formSchema>;
  posyandu: {id: string; nama: string}[];
}) {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: user?.nama,
      posyandu_id: user?.posyandu_id,
      role: user?.role,
      username: user?.username,
    },
  });

  // form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const req = await updateUser(userId, values);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil Mengubah Pengguna!");
        push("/users");
      }
    } catch (error) {
      console.log(error);
      toast.success("Gagal Mengubah Pengguna!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Contoh : alisyaanggraini" {...field} />
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
                <Input placeholder="Contoh : Alisya Anggraini" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="no_telepon"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input placeholder="Contoh : 087645679127" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="role"
          render={({field}) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PETUGAS">Petugas Posyandu</SelectItem>
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
            <FormItem>
              <FormLabel>Posyandu</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  defaultValue={field.value}
                  value={field.value}
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
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukan Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-5 text-end">
          <Button
            onClick={() => push("/users")}
            disabled={form.formState.isSubmitting}
            variant={"ghost"}
            className="border"
            type="reset">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
