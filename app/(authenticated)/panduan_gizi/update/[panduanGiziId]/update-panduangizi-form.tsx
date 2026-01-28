"use client";

import {updatePanduanGizi} from "@/app/actions/panduangizi";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
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
import {InputGroup, InputGroupInput} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Spinner} from "@/components/ui/spinner";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {CircleAlertIcon, CircleCheckIcon, CircleXIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {toast} from "sonner";
import z from "zod";

type Props = {
  panduanGiziId: string;
  ahliGizi: {id: string; nama: string}[];
  panduanGizi: z.infer<typeof panduanGiziSchema>;
};

const JenisIndeksEnum = z.enum(
  ["BB_U", "TB_U", "BB_TB", "IMT_U"],
  "Jenis indeks tidak boleh kosong!",
);

const StatusEnum = z.enum(["pending", "rejected", "published"]);

const panduanGiziSchema = z.object({
  ahli_gizi_id: z.string({message: "Ahli gizi tidak boleh kosong!"}),
  judul: z.string({message: "Judul tidak boleh kosong!"}),
  deskripsi: z.string({message: "Deskripsi tidak boleh kosong!"}),
  status: StatusEnum,
  usia_min: z.number({message: "Usia minimal tidak boleh kosong!"}),
  usia_max: z.number({message: "Usia maksimal tidak boleh kosong!"}),
  jenis_indeks: JenisIndeksEnum,
  catatan_admin: z.string(),
  target_status: z.string({message: "Target status tidak boleh kosong!"}),
  rekomendasi_item: z
    .array(
      z.object({
        nama_makanan: z.string(),
      }),
    )
    .min(1, "Tambahkan setidaknya satu rekomendasi makanan."),
});

const formSchema = z.object({
  ahli_gizi_id: z.string({message: "Ahli gizi tidak boleh kosong!"}),
  judul: z.string({message: "Judul tidak boleh kosong!"}),
  deskripsi: z.string({message: "Deskripsi tidak boleh kosong!"}),
  status: z.string(),
  usia_min: z.number({message: "Usia minimal tidak boleh kosong!"}),
  usia_max: z.number({message: "Usia maksimal tidak boleh kosong!"}),
  jenis_indeks: JenisIndeksEnum,
  target_status: z.string({message: "Target status tidak boleh kosong!"}),
  catatan_admin: z.string({message: "Catatan tidak boleh kosong!"}),
  makanan: z
    .array(
      z.object({
        name: z.string().nonempty({message: "Makanan tidak boleh kosong!"}),
      }),
    )
    .min(1, "Tambahkan setidaknya satu rekomendasi makanan."),
});

const UpdatePanduanGiziForm = ({
  ahliGizi,
  panduanGizi,
  panduanGiziId,
}: Props) => {
  const makanan = panduanGizi?.rekomendasi_item?.map(({nama_makanan}) => {
    return {name: nama_makanan};
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: panduanGizi?.status,
      makanan: makanan,
      ahli_gizi_id: panduanGizi?.ahli_gizi_id,
      deskripsi: panduanGizi?.deskripsi,
      jenis_indeks: panduanGizi?.jenis_indeks,
      judul: panduanGizi?.judul,
      target_status: panduanGizi?.target_status,
      usia_max: panduanGizi?.usia_max,
      usia_min: panduanGizi?.usia_min,
      catatan_admin: panduanGizi?.catatan_admin,
    },
  });

  const {push} = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      catatan_admin: values?.catatan_admin,
      status: values?.status,
    };

    try {
      const req = await updatePanduanGizi(panduanGiziId, payload);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil mengubah status publikasi!");
        push("/panduan_gizi");
      } else {
        toast.error("Gagal mengubah status publikasi!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengubah status publikasi!");
    }
  };

  const {fields} = useFieldArray({
    control: form.control,
    name: "makanan",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Status Publikasi Panduan Gizi</CardTitle>
        <CardDescription>
          Formulir Ubah Status Publikasi Panduan Gizi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Umum</CardTitle>
                <CardDescription>
                  Informasi Umum Mengenai Panduan Gizi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="ahli_gizi_id"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ahli Gizi</FormLabel>
                      <FormControl>
                        <Select
                          disabled
                          {...field}
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
                <FormField
                  control={form.control}
                  name="judul"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="Masukan Judul"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled
                          placeholder="Masukan Deskripsi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="usia_min"
                    render={({field}) => (
                      <FormItem className="w-full">
                        <FormLabel>Usia minimal (bulan)</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Masukan Usia minimal (bulan)"
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usia_max"
                    render={({field}) => (
                      <FormItem className="w-full">
                        <FormLabel>Usia maksimal (bulan)</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Masukan Usia maksimal (bulan)"
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
                <section className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="jenis_indeks"
                    render={({field}) => (
                      <FormItem className="w-full">
                        <FormLabel>Jenis indeks</FormLabel>
                        <FormControl>
                          <Select
                            disabled
                            {...field}
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
                        <FormLabel>Target status</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            disabled
                            onValueChange={field.onChange}
                            value={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Target Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sangat_pendek">
                                Sangat Pendek
                              </SelectItem>
                              <SelectItem value="pendek">Pendek</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="tinggi">Tinggi</SelectItem>
                              <SelectItem value="bb_sangat_kurang">
                                Berat Badan Sangat Kurang
                              </SelectItem>
                              <SelectItem value="bb_kurang">
                                Berat Badan Kurang
                              </SelectItem>
                              <SelectItem value="bb_normal">
                                Berat Badan Normal
                              </SelectItem>
                              <SelectItem value="risiko_bb_lebih">
                                Risiko Berat Badan Berlebih
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Makanan</CardTitle>
                <CardDescription>
                  Beberapa Makanan yang Direkomendasikan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldSet className="gap-4">
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
                                  disabled
                                  {...controllerField}
                                  id={`form-rhf-array-makanan-${index}`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Masukan nama makanan"
                                  type="text"
                                />
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
                </FieldSet>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status Publikasi</CardTitle>
                <CardDescription>
                  Informasi Mengenai Status Publikasi dan Catatan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Status Publikasi</FormLabel>
                      <FormControl>
                        <Select
                          disabled={form.formState.isSubmitting}
                          {...field}
                          onValueChange={field.onChange}
                          value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status publikasi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <CircleAlertIcon /> Pending
                              </Badge>
                            </SelectItem>
                            <SelectItem value="published">
                              <Badge className="bg-green-100 text-green-900">
                                <CircleCheckIcon /> Setujui
                              </Badge>
                            </SelectItem>
                            <SelectItem value="rejected">
                              <Badge className="bg-red-100 text-red-800">
                                <CircleXIcon /> Tolak
                              </Badge>
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
                  name="catatan_admin"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Catatan </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={form.formState.isSubmitting}
                          placeholder="Masukan Catatan (Berupa alasan untuk mengubah status publikasi)"
                          {...field}
                          value={field?.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <div className="space-x-5 text-end">
              <Button
                onClick={() => push("/staff/panduangizi")}
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
};

export default UpdatePanduanGiziForm;
