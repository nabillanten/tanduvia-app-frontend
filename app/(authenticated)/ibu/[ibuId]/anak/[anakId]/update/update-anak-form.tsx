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
import {CalendarIcon, CreditCard, Users} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {updateAnak} from "@/app/actions/anak";
import {Spinner} from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {addHours, format, startOfDay} from "date-fns";
import {id} from "date-fns/locale";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

const formSchema = z.object({
  nama: z.string().min(2, {message: "Nama lengkap minimal 2 karakter"}),
  nik: z.string().min(16, {message: "NIK minimal 16 karakter"}),
  tempat_lahir: z
    .string()
    .nonempty({message: "Tempat lahir tidak boleh kosong!"}),
  rfid_tag: z.string().nonempty({message: "RFID tag tidak boleh kosong!"}),
  tanggal_lahir: z.date({message: "Tanggal lahir tidak boleh kosong!"}),
  jenis_kelamin: z.enum(["L", "P"], {
    message: "Jenis kelamin tidak boleh kosong!",
  }),
});

type Prop = {
  anakId: string;
  anak: z.infer<typeof formSchema>;
  ibu: {
    id: string;
    nama: string;
    nik: string;
  };
};

export default function UpdateAnakForm({anak, anakId, ibu}: Prop) {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: anak?.nama,
      nik: anak?.nik,
      rfid_tag: anak?.rfid_tag,
      tempat_lahir: anak?.tempat_lahir,
      tanggal_lahir: new Date(anak?.tanggal_lahir),
      jenis_kelamin: anak?.jenis_kelamin,
    },
  });

  // form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const adjustedDate = addHours(startOfDay(values.tanggal_lahir), 12);

    const payload = {
      ...values,
      tanggal_lahir: adjustedDate,
      ibu_id: ibu?.id,
    };

    try {
      const req = await updateAnak(anakId, payload);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil Mengubah Anak!");
        push("/anak");
      } else {
        // toast.warning(res?.message ?? res?.message?.[0]);
        toast.error("Gagal Mengubah Anak!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal Mengubah Anak!");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Data Anak</CardTitle>
        <CardDescription>Formulir Ubah Data Anak</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex gap-4 pb-8">
          <Item variant="outline" size="sm" className="w-full">
            <ItemMedia variant="icon">
              <Users />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Nama Ibu</ItemTitle>
              <ItemDescription>{ibu?.nama}</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm" className="w-full">
            <ItemMedia variant="icon">
              <CreditCard />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>NIK Ibu</ItemTitle>
              <ItemDescription>{ibu?.nik}</ItemDescription>
            </ItemContent>
          </Item>
        </section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="nama"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form?.formState?.isSubmitting}
                      placeholder="Masukan nama anak"
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
                name="nik"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form?.formState?.isSubmitting}
                        placeholder="Masukan NIK anak"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenis_kelamin"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select
                        disabled={form?.formState?.isSubmitting}
                        defaultValue={field?.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis kelami anak" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Laki-laki</SelectItem>
                          <SelectItem value="P">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex gap-4">
              <FormField
                control={form.control}
                name="tempat_lahir"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan tempat lahir anak"
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
                            disabled={form?.formState?.isSubmitting}
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}>
                            {field.value ? (
                              // format(field.value, "PPP")
                              format(field.value, "dd MMMM yyyy", {locale: id})
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
                          onSelect={field.onChange} // Connects the calendar to RHF's onChange
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
              control={form.control}
              name="rfid_tag"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>RFID Tag</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form?.formState?.isSubmitting}
                      placeholder="Masukan RFID"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Arahkan kursor ke kolom input di atas, dan pindai kartu RFID
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-5 text-end">
              <Button
                onClick={() => push("/anak")}
                disabled={form.formState.isSubmitting}
                variant={"ghost"}
                className="border"
                type="reset">
                Batal
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner />} Simpan
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
