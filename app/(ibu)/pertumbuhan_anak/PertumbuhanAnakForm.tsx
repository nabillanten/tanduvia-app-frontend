"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {CalendarIcon, Search, Baby, ArrowLeft, Undo2} from "lucide-react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {cn} from "@/lib/utils";

// Import Server Action

// Import Komponen Grafik yang sudah dibuat sebelumnya
// import PertumbuhanAnakList from "@/components/PertumbuhanAnakList";
import {checkGrowth} from "@/app/actions/check-growth";
import PertumbuhanAnakList from "./PertumbuhanAnakList";
import {useRouter} from "next/navigation";

// --- SCHEMA VALIDASI ---
const formSchema = z.object({
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  tanggal_lahir: z.date("Tanggal lahir harus diisi"),
});

export default function PerkembanganAnakPage() {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {push} = useRouter();

  // --- FORM SETUP ---
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      nama: "",
    },
  });

  // --- HANDLE SUBMIT ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const date = values.tanggal_lahir;

    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );

    // Konversi date ke ISO String sesuai format body API
    const payload = {
      nik: values.nik,
      nama: values.nama,
      tanggal_lahir: utcDate.toISOString(),
    };

    const res = await checkGrowth(payload);

    if (res.success) {
      if (res.data && res.data.length > 0) {
        setResultData(res.data);
        toast.success("Data ditemukan!");
      } else {
        toast.warning("Data anak tidak ditemukan dengan kredensial tersebut.");
      }
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  };

  // --- TOMBOL RESET / CARI LAGI ---
  const handleReset = () => {
    setResultData(null);
    form.reset();
  };

  // --- RENDER CONDITION: JIKA ADA DATA -> TAMPILKAN GRAFIK ---
  if (resultData) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Tombol Kembali Floating / Header */}
        <div className="bg-white border-b sticky top-0 z-50 px-4 py-3 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Cari Data Lain
            </Button>
          </div>
        </div>

        {/* Render Komponen Grafik List */}
        <PertumbuhanAnakList childrenData={resultData} />
      </div>
    );
  }

  // --- RENDER CONDITION: JIKA KOSONG -> TAMPILKAN FORM ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Baby size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Pantau Tumbuh Kembang
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Masukkan data diri Ibu/Anak untuk melihat riwayat pemeriksaan
            Posyandu.
          </p>
        </div>

        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle>Cari Data Anak</CardTitle>
            <CardDescription>Lengkapi formulir di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5">
                {/* Field NIK */}
                <FormField
                  control={form.control}
                  name="nik"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>NIK (Ibu)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="16 digit NIK..."
                          {...field}
                          maxLength={16}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field Nama */}
                <FormField
                  control={form.control}
                  name="nama"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama sesuai KTP..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field Tanggal Lahir */}
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
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}>
                              {field.value ? (
                                format(field.value, "PPP", {locale: id})
                              ) : (
                                <span>Pilih tanggal lahir</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>Sedang Mencari...</>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> Cek Data
                    </>
                  )}
                </Button>
                <Button
                  variant={"secondary"}
                  className="w-full"
                  type="button"
                  onClick={() => push("/")}
                  disabled={isLoading}>
                  <Undo2 /> Kembali
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-6">
          *Data yang ditampilkan akan hilang jika halaman dimuat ulang.
        </p>
      </div>
    </div>
  );
}
