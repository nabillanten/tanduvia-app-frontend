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
import {useEffect, useState} from "react";
import {getCookie} from "@/lib/cookies";
import {appConfig} from "@/app/app-config";
import {createUser} from "@/app/actions/users";

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
  password: z.string().min(8, {message: "Password minimal 8 karakter"}),
});

type PosyanduItem = {
  id: string;
  nama: string;
};

type Props = {
  data: PosyanduItem[];
  count: number;
};

export default function CreateUserForm() {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      nama: "",
      // no_telepon: "",
      password: "",
      posyandu_id: undefined,
      role: undefined,
    },
  });

  // get all posyandu
  const [posyandu, setPosyandu] = useState<Props>();
  useEffect(() => {
    const getPosyandu = async () => {
      try {
        const access_token = getCookie("access_token");
        const request = await fetch(appConfig.baseUrl + "/posyandu", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          cache: "no-store",
        });
        const response = await request.json();
        setPosyandu(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosyandu();
  }, []);

  // form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const req = await createUser(values);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil Membuat Pengguna!");
        push("/users");
      }
    } catch (error) {
      console.log(error);
      toast.success("Gagal Membuat Pengguna!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Select defaultValue={undefined} onValueChange={field.onChange}>
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
                <Select defaultValue={undefined} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Posyandu" />
                  </SelectTrigger>
                  <SelectContent>
                    {posyandu?.data?.map(({id, nama}) => (
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
            onClick={() => push("/pengguna")}
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
