"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm, useFieldArray, useWatch, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {toast} from "sonner";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";

import {updatePanduanGizi} from "@/app/actions/panduangizi";

// UI Components
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Spinner} from "@/components/ui/spinner";
import {Textarea} from "@/components/ui/textarea";

// --- CONSTANTS & TYPES ---

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
    BB_TB: [],
    IMT_U: [],
  };

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

// Schema untuk validasi Form
const formSchema = z.object({
  ahli_gizi_id: z.string({message: "Ahli gizi tidak boleh kosong!"}),
  judul: z.string({message: "Judul tidak boleh kosong!"}),
  deskripsi: z.string({message: "Deskripsi tidak boleh kosong!"}),
  status: z.string().optional(),
  usia_min: z.number({message: "Usia minimal tidak boleh kosong!"}),
  usia_max: z.number({message: "Usia maksimal tidak boleh kosong!"}),
  jenis_indeks: JenisIndeksEnum,
  target_status: z.string({message: "Target status tidak boleh kosong!"}),
  makanan: z
    .array(
      z.object({
        name: z.string().min(1, {message: "Makanan tidak boleh kosong!"}),
      }),
    )
    .min(1, "Tambahkan setidaknya satu rekomendasi makanan."),
});

type Props = {
  panduanGiziId: string;
  ahliGizi: {id: string; nama: string}[];
  panduanGizi: {
    ahli_gizi_id: string;
    judul: string;
    deskripsi: string;
    status: "pending" | "rejected" | "published";
    usia_min: number;
    usia_max: number;
    jenis_indeks: "BB_U" | "TB_U" | "BB_TB" | "IMT_U";
    target_status: string;
    catatan_admin?: string | null;
    rekomendasi_item: {nama_makanan: string}[];
  };
};

const UpdatePanduanGiziForm = ({
  ahliGizi,
  panduanGizi,
  panduanGiziId,
}: Props) => {
  const {push} = useRouter();

  const defaultMakanan = panduanGizi?.rekomendasi_item?.map(
    ({nama_makanan}) => ({
      name: nama_makanan,
    }),
  ) || [{name: ""}];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ahli_gizi_id: panduanGizi?.ahli_gizi_id,
      judul: panduanGizi?.judul,
      deskripsi: panduanGizi?.deskripsi,
      status: panduanGizi?.status,
      usia_min: panduanGizi?.usia_min,
      usia_max: panduanGizi?.usia_max,
      jenis_indeks: panduanGizi?.jenis_indeks,
      target_status: panduanGizi?.target_status,
      makanan: defaultMakanan,
    },
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "makanan",
  });

  const [selectedIndeks, usiaMin, usiaMax] = useWatch({
    control: form.control,
    name: ["jenis_indeks", "usia_min", "usia_max"],
  });

  const currentCategoryValue = AGE_CATEGORIES.find(
    (cat) => cat.min === usiaMin && cat.max === usiaMax,
  )?.value;

  useEffect(() => {
    if (selectedIndeks) {
      const currentTarget = form.getValues("target_status");
      const options = TARGET_STATUS_OPTIONS[selectedIndeks] || [];
      const isValid = options.some((opt) => opt.value === currentTarget);

      if (currentTarget && !isValid) {
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
      status: "pending",
    };

    try {
      const req = await updatePanduanGizi(panduanGiziId, payload);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200 || res?.success) {
        toast.success("Berhasil mengubah panduan gizi!");
        push("/rekomendasi_gizi");
      } else {
        toast.warning(res?.message || "Gagal mengubah panduan gizi!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengubah panduan gizi!");
    }
  };

  return (
    <section className="space-y-4">
      {/* STATUS CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Status & Catatan Admin</CardTitle>
          <CardDescription>
            {panduanGizi?.catatan_admin || "Tidak ada catatan."}
          </CardDescription>
          <CardAction>
            {panduanGizi?.status === "published" ? (
              <Badge className="bg-green-100 text-green-900 hover:bg-green-200">
                <CircleCheckIcon className="w-4 h-4 mr-1" /> Terbit
              </Badge>
            ) : panduanGizi?.status === "pending" ? (
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                <CircleAlertIcon className="w-4 h-4 mr-1" /> Pending
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                <CircleXIcon className="w-4 h-4 mr-1" /> Ditolak
              </Badge>
            )}
          </CardAction>
        </CardHeader>
      </Card>

      {/* FORM CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Ubah Data Rekomendasi Gizi</CardTitle>
          <CardDescription>
            Sesuaikan data rekomendasi gizi di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* FIELD: AHLI GIZI */}
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

              {/* FIELD: JUDUL */}
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

              {/* FIELD: DESKRIPSI */}
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

              <div className="space-y-2">
                <FormLabel>Kategori Umur</FormLabel>
                <Select
                  disabled={form.formState.isSubmitting}
                  value={currentCategoryValue || ""}
                  onValueChange={(val) => {
                    const cat = AGE_CATEGORIES.find((c) => c.value === val);
                    if (cat) {
                      form.setValue("usia_min", cat.min);
                      form.setValue("usia_max", cat.max);
                    }
                  }}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        currentCategoryValue
                          ? undefined
                          : "Pilih Kategori Umur (atau set manual)"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label} ({cat.min}-{cat.max} bln)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Indikator visual nilai asli */}
                <div className="text-xs text-muted-foreground">
                  Rentang usia tersimpan:{" "}
                  <b>
                    {usiaMin ?? 0} - {usiaMax ?? 0} bulan
                  </b>
                </div>

                {/* Hidden inputs agar Zod tetap valid */}
                <input
                  type="hidden"
                  {...form.register("usia_min", {valueAsNumber: true})}
                />
                <input
                  type="hidden"
                  {...form.register("usia_max", {valueAsNumber: true})}
                />

                {form.formState.errors.usia_min && (
                  <p className="text-sm font-medium text-destructive">
                    Kategori umur wajib dipilih
                  </p>
                )}
              </div>

              {/* SECTION: JENIS INDEKS & TARGET STATUS */}
              <section className="flex flex-col md:flex-row gap-6">
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
                            <SelectItem value="BB_U">BB_U</SelectItem>
                            <SelectItem value="TB_U">TB_U</SelectItem>
                            <SelectItem value="BB_TB">BB_TB</SelectItem>
                            <SelectItem value="IMT_U">IMT_U</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                                  : "Pilih Indeks dahulu"
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
                                  ? "Opsi belum tersedia"
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

              {/* FIELD ARRAY: MAKANAN */}
              <FieldSet className="gap-4">
                <FieldLegend variant="label">Makanan</FieldLegend>
                <FieldDescription>Daftar rekomendasi makanan.</FieldDescription>
                <FieldGroup className="gap-4">
                  {fields.map((field, index) => (
                    <Controller
                      key={field.id}
                      name={`makanan.${index}.name`}
                      control={form.control}
                      render={({field: controllerField, fieldState}) => (
                        <Field
                          className="w-full"
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <InputGroup>
                              <InputGroupInput
                                disabled={form.formState.isSubmitting}
                                {...controllerField}
                                id={`form-rhf-array-makanan-${index}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="Nama makanan"
                                type="text"
                              />
                              {fields.length > 1 && (
                                <InputGroupAddon align="inline-end">
                                  <InputGroupButton
                                    type="button"
                                    variant="ghost"
                                    size="icon-xs"
                                    onClick={() => remove(index)}
                                    aria-label={`Hapus makanan ${index + 1}`}>
                                    <XIcon />
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

              {/* BUTTON ACTIONS */}
              <div className="space-x-5 text-end pt-4 border-t">
                <Button
                  onClick={() => push("/rekomendasi_gizi")}
                  disabled={form.formState.isSubmitting}
                  variant={"ghost"}
                  className="border"
                  type="button">
                  Batal
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Spinner className="mr-2" />}
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default UpdatePanduanGiziForm;
