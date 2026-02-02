"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm, useFieldArray, useWatch, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {PlusIcon, XIcon} from "lucide-react";
import {toast} from "sonner";

// UI Components (Sesuaikan path import dengan struktur project Anda)
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Spinner} from "@/components/ui/spinner";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

// Server Action
import {createPanduanGizi} from "@/app/actions/panduangizi";

// --- TYPES & CONSTANTS ---

type Props = {
  ahliGizi: {id: string; nama: string}[];
};

// Mapping untuk Target Status berdasarkan Jenis Indeks
const TARGET_STATUS_OPTIONS: Record<string, {label: string; value: string}[]> =
  {
    BB_U: [
      {label: "Berat Badan Sangat Kurang", value: "bb_sangat_kurang"},
      {label: "Berat Badan Kurang", value: "bb_kurang"},
      {label: "Berat Badan Normal", value: "bb_normal"},
      {label: "Risiko Berat Badan Berlebih", value: "risiko_bb_lebih"},
    ],
    TB_U: [
      {label: "Sangat Pendek", value: "sangat_pendek"},
      {label: "Pendek", value: "pendek"},
      {label: "Normal", value: "normal"},
      {label: "Tinggi", value: "tinggi"},
    ],
  };

// Mapping untuk Kategori Umur
const AGE_CATEGORIES = [
  {label: "0 - 6 Bulan", value: "0-6_bln", min: 0, max: 6},
  {label: "6 - 12 Bulan", value: "6-12_bln", min: 6, max: 12},
  {label: "1 - 2 Tahun", value: "1-2_thn", min: 12, max: 24},
  {label: "2 - 5 Tahun", value: "2-5_thn", min: 24, max: 60},
];

const JenisIndeksEnum = z.enum(
  ["BB_U", "TB_U", "BB_TB", "IMT_U"],
  "Jenis indeks tidak boleh kosong!",
);

// Zod Schema
const formSchema = z.object({
  ahli_gizi_id: z.string({message: "Ahli gizi tidak boleh kosong!"}),
  judul: z.string().min(1, {message: "Judul tidak boleh kosong!"}),
  deskripsi: z.string().min(1, {message: "Deskripsi tidak boleh kosong!"}),
  status: z.string(),
  usia_min: z.number("Usia minimal wajib diisi via kategori"),
  usia_max: z.number("Usia maksimal wajib diisi via kategori"),
  jenis_indeks: JenisIndeksEnum,
  target_status: z
    .string()
    .min(1, {message: "Target status tidak boleh kosong!"}),
  makanan: z
    .array(
      z.object({
        name: z.string().min(1, {message: "Nama makanan tidak boleh kosong!"}),
      }),
    )
    .min(1, "Tambahkan setidaknya satu rekomendasi makanan."),
});

const CreatePanduanGiziForm = ({ahliGizi}: Props) => {
  const {push} = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "pending",
      makanan: [{name: ""}],
      usia_min: 0,
      usia_max: 0,
      ahli_gizi_id: undefined,
      deskripsi: "",
      judul: "",
    },
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "makanan",
  });

  const watchedValues = useWatch({
    control: form.control,
    name: ["jenis_indeks", "usia_min", "usia_max"],
  });

  const [selectedIndeks, usiaMin, usiaMax] = watchedValues;

  useEffect(() => {
    // Cek agar tidak me-reset saat mount awal jika data kosong
    if (selectedIndeks) {
      const currentTarget = form.getValues("target_status");
      const options = TARGET_STATUS_OPTIONS[selectedIndeks] || [];
      const isValid = options.some((opt) => opt.value === currentTarget);

      if (!isValid) {
        form.setValue("target_status", "");
      }
    }
  }, [selectedIndeks, form]);

  const currentStatusOptions = selectedIndeks
    ? TARGET_STATUS_OPTIONS[selectedIndeks]
    : [];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      makanan: values?.makanan?.map(({name}) => name),
    };

    try {
      const req = await createPanduanGizi(payload);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200 || res?.success) {
        toast.success("Berhasil membuat panduan gizi!");
        push("/rekomendasi_gizi");
      } else {
        toast.warning(res?.message || "Gagal membuat panduan gizi!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kegagalan sistem!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Rekomendasi Gizi Baru</CardTitle>
        <CardDescription>Formulir Rekomendasi Gizi Baru</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* AHLI GIZI */}
            <FormField
              control={form.control}
              name="ahli_gizi_id"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Ahli Gizi</FormLabel>
                  <FormControl>
                    <Select
                      disabled={form.formState.isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue=""
                      value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih ahli gizi" />
                      </SelectTrigger>
                      <SelectContent>
                        {ahliGizi?.map(({nama, id}) => (
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

            {/* JUDUL */}
            <FormField
              control={form.control}
              name="judul"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Masukan Judul"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESKRIPSI */}
            <FormField
              control={form.control}
              name="deskripsi"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={form.formState.isSubmitting}
                      placeholder="Masukan Deskripsi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* KATEGORI UMUR (Menggantikan Input Manual) */}
            <div className="space-y-2">
              <FormLabel>Kategori Umur</FormLabel>
              <Select
                disabled={form.formState.isSubmitting}
                onValueChange={(val) => {
                  const cat = AGE_CATEGORIES.find((c) => c.value === val);
                  if (cat) {
                    form.setValue("usia_min", cat.min);
                    form.setValue("usia_max", cat.max);
                  }
                }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Kategori Umur Anak" />
                </SelectTrigger>
                <SelectContent>
                  {AGE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label} ({cat.min}-{cat.max} bln)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Visualisasi Nilai (Optional) */}
              <div className="text-xs text-muted-foreground">
                Rentang usia tersimpan:{" "}
                <b>
                  {usiaMin} - {usiaMax} bulan
                </b>
              </div>

              {/* Hidden Inputs untuk Zod Validation & Submission */}
              <input
                type="hidden"
                {...form.register("usia_min", {valueAsNumber: true})}
              />
              <input
                type="hidden"
                {...form.register("usia_max", {valueAsNumber: true})}
              />

              {/* Tampilkan error manual jika ada error di hidden fields */}
              {form.formState.errors.usia_min && (
                <p className="text-sm font-medium text-destructive">
                  Kategori umur wajib dipilih
                </p>
              )}
            </div>

            {/* SECTION JENIS INDEKS & TARGET STATUS */}
            <section className="flex flex-col md:flex-row gap-6">
              {/* Jenis Indeks */}
              <FormField
                control={form.control}
                name="jenis_indeks"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Jenis Indeks</FormLabel>
                    <FormControl>
                      <Select
                        disabled={form.formState.isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis indeks" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BB_U">
                            BB_U (Berat Badan / Umur)
                          </SelectItem>
                          <SelectItem value="TB_U">
                            TB_U (Tinggi Badan / Umur)
                          </SelectItem>
                          <SelectItem value="BB_TB">
                            BB_TB (Berat / Tinggi)
                          </SelectItem>
                          <SelectItem value="IMT_U">
                            IMT_U (IMT / Umur)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Status (Dinamis) */}
              <FormField
                control={form.control}
                name="target_status"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Target Status</FormLabel>
                    <FormControl>
                      <Select
                        disabled={
                          form.formState.isSubmitting || !selectedIndeks
                        }
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              selectedIndeks
                                ? "Pilih Target Status"
                                : "Pilih Jenis Indeks Dulu"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {currentStatusOptions.length > 0 ? (
                            currentStatusOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground text-center">
                              {selectedIndeks
                                ? "Opsi belum tersedia untuk indeks ini"
                                : "Pilih Indeks dahulu"}
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* DYNAMIC FOOD FIELDS */}
            <FieldSet className="gap-4">
              <FieldLegend variant="label">Rekomendasi Makanan</FieldLegend>
              <FieldDescription>
                Tambahkan daftar makanan yang direkomendasikan.
              </FieldDescription>

              <FieldGroup className="gap-4">
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`makanan.${index}.name`}
                    control={form.control}
                    render={({field: controllerField, fieldState}) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              disabled={form.formState.isSubmitting}
                              {...controllerField}
                              id={`food-item-${index}`}
                              aria-invalid={fieldState.invalid}
                              placeholder={`Contoh: Ikan Kembung, Telur Rebus...`}
                            />
                            {fields.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => remove(index)}
                                  aria-label="Hapus item">
                                  <XIcon className="h-4 w-4" />
                                </InputGroupButton>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
              </FieldGroup>

              <Button
                disabled={form.formState.isSubmitting}
                type="button"
                variant="outline"
                size="sm"
                className="w-fit mt-2"
                onClick={() => append({name: ""})}>
                <PlusIcon className="mr-2 h-4 w-4" /> Tambah Makanan
              </Button>
            </FieldSet>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                onClick={() => push("/rekomendasi_gizi")}
                disabled={form.formState.isSubmitting}
                variant="ghost"
                className="border"
                type="button">
                Batal
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner className="mr-2" />}
                Simpan Panduan
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreatePanduanGiziForm;
