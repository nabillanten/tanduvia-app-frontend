"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import z from "zod";
import {Spinner} from "./spinner";
import {FileDown} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {exportPemeriksaanToCSV} from "@/app/actions/pemeriksaan";

type Posyandu = {
  id: string;
  nama: string;
};

type Props = {
  data: Posyandu[];
};

const formSchema = z.object({
  posyandu_id: z.string("Posyandu tidak boleh kosong!"),
  quarter: z.string("Rentang quarter tidak boleh kosong!"),
  year: z.string("Tahun tidak boleh kosong!"),
});

const ExportToCSV = ({data}: Props) => {
  const currentYear = new Date().getFullYear();
  // Array length 6 = Tahun ini (1) + 5 tahun ke belakang
  const years = Array.from({length: 6}, (_, i) => (currentYear - i).toString());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {year: currentYear.toString()},
  });
  const [showDialogChangePassword, setShowDialogChangePassword] =
    React.useState(false);

  const resetFormFields = () => {
    form.reset({
      posyandu_id: undefined,
      quarter: undefined,
      year: currentYear.toString(),
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const selectedPosyandu = data.find((p) => p.id === values.posyandu_id);
    const posyanduName = selectedPosyandu ? selectedPosyandu.nama : "Posyandu";

    // Bersihkan nama file (Ganti spasi/karakter aneh dengan underscore)
    const safePosyanduName = posyanduName.replace(/[^a-zA-Z0-9]/g, "_");

    try {
      toast.info("Sedang mendownload file...");

      const res = await exportPemeriksaanToCSV(
        values.posyandu_id,
        values.quarter,
        values.year,
        safePosyanduName,
      );

      if (res.success && res.data) {
        // Decode Base64
        const binaryString = window.atob(res.data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Blob dengan tipe konten yang sesuai dari server
        const blob = new Blob([bytes], {type: res.contentType});

        // Download Trigger
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // GUNAKAN FILENAME DARI SERVER (PENTING)
        link.setAttribute("download", res.filename);

        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success(`Berhasil! File disimpan sebagai ${res.filename}`);
        resetFormFields();
        setShowDialogChangePassword(false);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error type
      toast.error(error.message || "Gagal mengekspor file.");
    }
  };

  return (
    <Form {...form}>
      <Dialog
        open={showDialogChangePassword}
        onOpenChange={setShowDialogChangePassword}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FileDown /> Unduh CSV
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <form className="space-y-6">
              <DialogHeader>
                <DialogTitle>Unduh Pemeriksaan ke CSV</DialogTitle>
                <DialogDescription>
                  Formulir Unduh Pemeriksaan ke CSV
                </DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="posyandu_id"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Posyandu</FormLabel>
                    <FormControl>
                      <Select
                        disabled={form?.formState?.isSubmitting}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Posyandu" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map(({id, nama}) => (
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
                name="quarter"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Quarter</FormLabel>
                    <FormControl>
                      <Select
                        disabled={form?.formState?.isSubmitting}
                        defaultValue={undefined}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Quarter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key={"Q1"} value={"Q1"}>
                            Q1 (Jan - Mar)
                          </SelectItem>
                          <SelectItem key={"Q2"} value={"Q2"}>
                            Q2 (Apr - Jun)
                          </SelectItem>
                          <SelectItem key={"Q3"} value={"Q3"}>
                            Q3 (Jul - Sep)
                          </SelectItem>
                          <SelectItem key={"Q4"} value={"Q4"}>
                            Q4 (Okt - Des)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Tahun</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tahun" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={form.formState.isSubmitting}
                    onClick={resetFormFields}
                    variant="outline">
                    Batal
                  </Button>
                </DialogClose>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting && <Spinner />} Unduh
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </form>
      </Dialog>
    </Form>
  );
};

export default ExportToCSV;
