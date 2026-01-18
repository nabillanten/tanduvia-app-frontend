"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {updatePosyandu} from "@/app/actions/posyandu";

const formSchema = z.object({
  alamat: z.string().nonempty({message: "Alamat tidak boleh kosong!"}),
  nama: z.string().nonempty({message: "Nama Posyandu tidak boleh kosong!"}),
});

export default function UpdatePosyanduForm({
  posyanduId,
  posyandu,
}: {
  posyanduId: string;
  posyandu: z.infer<typeof formSchema>;
}) {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: posyandu?.nama,
      alamat: posyandu?.alamat,
    },
  });

  // form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const req = await updatePosyandu(posyanduId, values);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil mengubah posyandu!");
        push("/posyandu");
      }
    } catch (error) {
      console.log(error);
      toast.success("Gagal mengubah posyandu!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <FormField
          control={form.control}
          name="nama"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nama Posyandu</FormLabel>
              <FormControl>
                <Input placeholder="Contoh : Posyandu Mawar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({field}) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan alamat lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-5 text-end">
          <Button
            onClick={() => push("/posyandu")}
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
