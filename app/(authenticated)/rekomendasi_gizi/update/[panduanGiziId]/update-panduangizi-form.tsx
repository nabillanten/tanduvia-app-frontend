"use client";

import {updatePanduanGizi} from "@/app/actions/panduangizi";
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
import {zodResolver} from "@hookform/resolvers/zod";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import {useRouter} from "next/navigation";
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
  target_status: z.string({message: "Target status tidak boleh kosong!"}),
  catatan_admin: z.string(),
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
    },
  });

  const {push} = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      makanan: values?.makanan?.map(({name}) => name),
      status: "pending",
    };

    try {
      const req = await updatePanduanGizi(panduanGiziId, payload);
      const res = await req;

      if (res?.statusCode === 201 || res?.statusCode === 200) {
        toast.success("Berhasil mengubah panduan gizi!");
        push("/rekomendasi_gizi");
      } else {
        toast.error("Gagal mengubah panduan gizi!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengubah panduan gizi!");
    }
  };

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "makanan",
  });

  return (
    <section className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Catatan : </CardTitle>
          <CardDescription>{panduanGizi?.catatan_admin ?? "-"}</CardDescription>
          <CardAction>
            {panduanGizi?.status === "published" ? (
              <Badge className="bg-green-100 text-green-900">
                <CircleCheckIcon /> Published
              </Badge>
            ) : panduanGizi?.status === "pending" ? (
              <Badge className="bg-yellow-100 text-yellow-800">
                <CircleAlertIcon /> Pending
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">
                <CircleXIcon /> Rejected
              </Badge>
            )}
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ubah Data Rekomendasi Gizi</CardTitle>
          <CardDescription>Formulir Ubah Data Rekomendasi Gizi</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <FormField
                control={form.control}
                name="ahli_gizi_id"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ahli Gizi</FormLabel>
                    <FormControl>
                      <Select
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
                      <Input placeholder="Masukan Judul" {...field} />
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
                      <Textarea placeholder="Masukan Deskripsi" {...field} />
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

              <FieldSet className="gap-4">
                <FieldLegend variant="label">Makanan</FieldLegend>
                <FieldDescription>
                  Masukan beberapa rekomendasi makanan
                </FieldDescription>
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
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({name: ""})}>
                  <PlusIcon /> Tambah Makanan
                </Button>
              </FieldSet>

              <div className="space-x-5 text-end">
                <Button
                  onClick={() => push("/rekomendasi_gizi")}
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
    </section>
  );
};

export default UpdatePanduanGiziForm;
