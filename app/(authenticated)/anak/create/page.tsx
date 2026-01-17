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
import {CalendarIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {createAnak} from "@/app/actions/anak";
import {Spinner} from "@/components/ui/spinner";

const formSchema = z.object({
  nama: z.string().min(2, {message: "Nama lengkap minimal 2 karakter"}),
  nik: z.string().min(16, {message: "NIK minimal 16 karakter"}),
  tempat_lahir: z
    .string()
    .nonempty({message: "Tempat lahir tidak boleh kosong!"}),
  rfid_tag: z.string().nonempty({message: "RFID tag tidak boleh kosong!"}),
  ibu_id: z.string().nonempty({message: "Ibu tidak boleh kosong!"}),
  tanggal_lahir: z.date({message: "Tanggal lahir tidak boleh kosong!"}),
  jenis_kelamin: z.enum(["L", "P"], {
    message: "Jenis kelamin tidak boleh kosong!",
  }),
});

type PosyanduItem = {
  id: string;
  nama: string;
  nik: string;
};

type Props = {
  data: PosyanduItem[];
  count: number;
};

export default function CreateAnakPage() {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      nik: "",
      rfid_tag: "",
      tempat_lahir: "",
      ibu_id: "",
      tanggal_lahir: undefined,
    },
  });

  // get all posyandu
  const [ibu, setIbu] = useState<Props>();
  useEffect(() => {
    const getAllIbu = async () => {
      try {
        const access_token = getCookie("access_token");
        const request = await fetch(appConfig.baseUrl + "/anak/ibu", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          cache: "no-store",
        });
        const response = await request.json();
        setIbu(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllIbu();
  }, []);

  // form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const req = await createAnak(values);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil Membuat Anak!");
        push("/anak");
      } else {
        toast.warning(res?.message ?? res?.message?.[0]);
      }
    } catch (error) {
      console.log(error);
      toast.success("Gagal Membuat Anak!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nama"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukan nama anak" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nik"
          render={({field}) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input placeholder="Masukan NIK anak" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tempat_lahir"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tempat Lahir</FormLabel>
              <FormControl>
                <Input placeholder="Masukan tempat lahir anak" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggal_lahir"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Lahir</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
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
        <FormField
          control={form.control}
          name="jenis_kelamin"
          render={({field}) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
                <Select defaultValue={undefined} onValueChange={field.onChange}>
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
        <FormField
          control={form.control}
          name="ibu_id"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nama Ibu - NIK</FormLabel>
              <FormControl>
                <Select defaultValue={undefined} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Posyandu" />
                  </SelectTrigger>
                  <SelectContent>
                    {ibu?.data?.map(({id, nama, nik}) => (
                      <SelectItem key={id} value={id}>
                        {nama} - {nik}
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
          name="rfid_tag"
          render={({field}) => (
            <FormItem>
              <FormLabel>RFID Tag</FormLabel>
              <FormControl>
                <Input placeholder="Masukan RFID" {...field} />
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
            onClick={() => push("/pengguna")}
            disabled={form.formState.isSubmitting}
            variant={"ghost"}
            className="border"
            type="reset">
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isLoading}>
            {form.formState.isLoading && <Spinner />}Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
