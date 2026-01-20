"use client";
import {createIbu, updateIbu} from "@/app/actions/ibu";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Spinner} from "@/components/ui/spinner";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {CalendarIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import z from "zod";

const formScheme = z.object({
  nama: z.string().min(2, "Nama tidak boleh kosong!"),
  nik: z
    .string("NIK tidak boleh kosong!")
    .min(16, "NIK tidak valid")
    .max(16, "NIK tidak valid"),
  no_telepon: z.string().min(1, "Nomor telepon tidak boleh kosong!"),
  alamat: z.string().min(2, "Alamat tidak boleh kosong!"),
  tempat_lahir: z.string().min(2, "Tempat lahir tidak boleh kosong!"),
  tanggal_lahir: z.date({message: "Tanggal lahir tidak boleh kosong!"}),
});

type Props = {
  ibuId: string;
  ibu: z.infer<typeof formScheme>;
};

const UpdateIbuForm = ({ibu, ibuId}: Props) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      nama: ibu?.nama,
      nik: ibu?.nik,
      tempat_lahir: ibu?.tempat_lahir,
      alamat: ibu?.alamat,
      no_telepon: ibu?.no_telepon,
      tanggal_lahir: new Date(ibu?.tanggal_lahir),
    },
  });

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      const req = await updateIbu(ibuId, values);
      const res = await req;
      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil Mengubah Ibu!");
        push("/ibu");
      } else {
        // toast.warning(res?.message ?? res?.message?.[0]);
        toast.success("Gagal Mengubah Ibu!");
      }
    } catch (error) {
      console.log(error);
      toast.success("Gagal Mengubah Ibu!");
    }
  };

  const {push} = useRouter();
  return (
    <Form {...form}>
      <form className="space-y-6 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="nama"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="nik"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan NIK" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex gap-4">
          <FormField
            name="tempat_lahir"
            control={form.control}
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tempat Lahir</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan Tempat Lahir"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tanggal_lahir"
            render={({field}) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}>
                        {field.value ? (
                          // format(field.value, "PPP")
                          field.value.toLocaleDateString()
                        ) : (
                          <span>Pilih Tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          name="no_telepon"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan Nomor Telepon (08xxxxxxxxxx)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="alamat"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan Alamat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-5 text-end">
          <Button
            onClick={() => push("/ibu")}
            disabled={form.formState.isSubmitting}
            variant={"ghost"}
            className="border"
            type="reset">
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateIbuForm;
