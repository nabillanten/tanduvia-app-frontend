"use client";
import {appConfig} from "@/app/app-config";
import {defineStepper} from "@/components/stepper";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
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
  InputGroupInput,
} from "@/components/ui/input-group";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {Separator} from "@/components/ui/separator";
import {calculateAgeInMonths} from "@/lib/calculateAgeinMonths";
import {getCookie} from "@/lib/cookies";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Baby,
  CalendarIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  CreditCard,
  MapPinHouseIcon,
  User,
  Users,
  SplitSquareVerticalIcon,
} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useForm, useFormContext} from "react-hook-form";
import {toast} from "sonner";
import z from "zod";
import {calculateZScore} from "@/app/actions/zscore";
import {Badge} from "@/components/ui/badge";
import {Textarea} from "@/components/ui/textarea";
import {createPemeriksaan} from "@/app/actions/pemeriksaan";
import {getAnakByRFID} from "@/app/actions/anak";
import {format} from "date-fns";
import {id} from "date-fns/locale";

// SCHEMA START
const rfidSchema = z.object({
  rfid_tag: z.string("Scan RFID!").min(10, "Silakan scan RFID!"),
});

const anakSchema = z.object({
  id: z.string(),
  nama: z.string(),
  ibu_id: z.string(),
  ibu: z.object({
    nama: z.string(),
    nik: z.string(),
  }),
  rfid_tag: z.string(),
  nik: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.date(),
  jenis_kelamin: z.enum(["P", "L"]),
});

const pemeriksaanSchema = z.object({
  anak_id: z.string().optional(),
  posyandu_id: z.string("Posyandu tidak boleh kosong!"),
  tanggal_pemeriksaan: z.date("Tanggal pemeriksaan tidak boleh kosong!"),
  berat_badan: z.string("Berat badan tidak boleh kosong!"),
  tinggi_badan: z.string("Tinggi badan tidak boleh kosong!"),
  usia_bulan: z.string("Usia tidak boleh kosong!"),
});

const hasilPemeriksaanSchema = z.object({
  anakId: z.string(),
  posyanduId: z.string(),
  tanggalPemeriksaan: z.date("Tanggal pemeriksaan tidak boleh kosong!"),
  beratBadan: z.string("Berat badan tidak boleh kosong!"),
  tinggiBadan: z.string("Tinggi badan tidak boleh kosong!"),
  usiaBulan: z.string("Usia tidak boleh kosong!"),
  statusBBU: z.string(),
  statusTBU: z.string(),
  zScoreTBU: z.float32(),
  zScoreBBU: z.float32(),
  catatan: z.string().optional().default(""),
});

const zScoreSchema = z.object({
  data: z.object({
    scoreResult: z.object({
      zScoreBBUResult: z.float32(),
      zScoreTBUResult: z.float32(),
    }),
    statusResult: z.object({
      BBUStatusResult: z.string(),
      TBUStatusResult: z.string(),
    }),
  }),
});

type zScoreType = z.infer<typeof zScoreSchema>;

const posyanduSchema = z.array(
  z.object({
    id: z.string(),
    nama: z.string(),
  }),
);

type posyanduType = z.infer<typeof posyanduSchema>;

// SCHEMA END

// STEPPER START
const {utils, steps, useStepper} = defineStepper(
  {id: "rfid_scan", title: "Pindai RFID", schema: rfidSchema},
  {id: "data_verification", title: "Identitas Anak", schema: anakSchema},
  {
    id: "input_pemeriksaan",
    title: "Input Pemeriksaan",
    schema: pemeriksaanSchema,
  },
  {
    id: "insert_hasil_pemeriksaan",
    title: "Hasil Pemeriksaan",
    schema: hasilPemeriksaanSchema,
  },
);
// STEPPER END

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-foreground/30 bg-opacity-0 z-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

// PAGE
const CreatePemeriksaanPage = () => {
  // Define Stepper
  const stepper = useStepper();

  // Define Form
  const form = useForm({
    resolver: zodResolver(stepper.current.schema),
  });

  // Set focus on rfid field
  useEffect(() => {
    form.setFocus("rfid_tag");
  });

  // Data Anak from getAnakByRfid
  const [anak, setAnak] = useState<z.infer<typeof anakSchema>>();

  // Data Pemeriksaan froms step 3 form submission
  const [pemeriksaanData, setPemeriksaanData] =
    useState<z.infer<typeof pemeriksaanSchema>>();

  const [zScodeResult, setZScoreResult] = useState<zScoreType>();

  // Submitting Form Function
  const onSubmit = async (values: z.infer<typeof stepper.current.schema>) => {
    if (stepper?.current?.id === "rfid_scan") {
      try {
        setIsLoading(true);
        // @ts-expect-error error type
        const response = await getAnakByRFID(values?.rfid_tag);
        if (response?.statusCode === 200 && response?.data?.count !== 0) {
          if (response?.data?.data?.[0]?.is_active) {
            toast.success("Data Anak Ditemukan!");
            setAnak(response?.data?.data[0]);
            setTimeout(() => stepper.next(), 1000);
          } else {
            toast.error("Data Anak Tidak Aktif!");
          }
        } else {
          toast.error("Data Anak Tidak Ditemukan!");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan, periksa koneksi anda");
        // toast.error(error.name);
        console.log(error, "error");
      } finally {
        form.resetField("rfid_tag");
        setIsLoading(false);
      }
    } else if (stepper.current.id === "input_pemeriksaan") {
      const payload = {
        // @ts-expect-error error type
        umur_bulan: parseInt(values?.usia_bulan),
        jenis_kelamin: anak?.jenis_kelamin,
        // @ts-expect-error error type
        berat_badan: parseInt(values?.berat_badan),
        // @ts-expect-error error type
        tinggi_badan: parseInt(values?.tinggi_badan),
      };
      try {
        setIsLoading(true);
        const response = await calculateZScore(payload);
        if (response?.statusCode === 200 || response?.statusCode === 201) {
          setZScoreResult(response);
          toast.success("Berhasil menghitung z-score!");
          setTimeout(() => stepper.next(), 1000);
        } else {
          toast.error("Gagal menghitung z-score!");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan, periksa koneksi anda");
        // toast.error(error.name);
        console.log(error, "error");
      } finally {
        // @ts-expect-error error type
        setPemeriksaanData(values);
        setIsLoading(false);
      }
    } else {
      const payload = {
        ...values,
        // @ts-expect-error error type
        beratBadan: parseInt(values?.beratBadan),
        // @ts-expect-error error type
        tinggiBadan: parseInt(values?.tinggiBadan),
        // @ts-expect-error error type
        usiaBulan: parseInt(values?.usiaBulan),
        tanggalPemeriksaan: new Date(
          // @ts-expect-error error type
          values?.tanggalPemeriksaan,
        ).toISOString(),
      };

      try {
        setIsLoading(true);
        const response = await createPemeriksaan(payload);
        console.log(response, "response");
        if (response?.statusCode === 200 || response?.statusCode === 201) {
          toast.success("Berhasil menyimpan pemeriksaan!");
          stepper.reset();
          form.reset();
        } else {
          toast.error("Gagal menyimpan pemeriksaan!");
        }
      } catch (error) {
        console.log(error, "error");
        toast.error("Terjadi kesalahan, periksa koneksi anda");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {isLoading && <Loading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-medium">Pemeriksaan</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Langkah {currentIndex + 1} dari {steps.length}
              </span>
            </div>
          </div>
          <nav aria-label="Langkah Pemeriksaan" className="group my-6">
            <ol className="flex items-baseline justify-between gap-2">
              {stepper.all.map((step, index, array) => (
                <React.Fragment key={step.id}>
                  <li className="flex flex-col items-center gap-2">
                    <Button
                      type="button"
                      role="tab"
                      variant={index <= currentIndex ? "default" : "secondary"}
                      aria-current={
                        stepper.current.id === step.id ? "step" : undefined
                      }
                      aria-posinset={index + 1}
                      aria-setsize={steps.length}
                      aria-selected={stepper.current.id === step.id}
                      className="flex size-10 items-center justify-center rounded-full">
                      {index + 1}
                    </Button>
                    <span className="text-sm font-medium">{step.title}</span>
                  </li>
                  {index < array.length - 1 && (
                    <Separator
                      className={`flex-1 ${
                        index < currentIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </ol>
          </nav>
          <div>
            {stepper.switch({
              rfid_scan: () => <RfidScan isLoading={isLoading} />,
              // @ts-expect-error error type
              data_verification: () => <IdentitasAnak anak={anak} />,
              // @ts-expect-error error type
              input_pemeriksaan: () => <InputPemeriksaan anak={anak} />,
              insert_hasil_pemeriksaan: () => (
                <InsertHasilPemeriksaan
                  // @ts-expect-error error type
                  anak={anak}
                  // @ts-expect-error error type
                  zScodeResult={zScodeResult}
                  // @ts-expect-error error type
                  pemeriksaanData={pemeriksaanData}
                />
              ),
            })}

            {/* {!stepper.isLast ? (
              <div className="flex justify-end gap-4">
                <Button
                  variant="secondary"
                  onClick={stepper.prev}
                  disabled={stepper.isFirst}>
                  Back
                </Button>
                <Button type="submit">
                  {stepper.isLast ? "Complete" : "Next"}
                </Button>
              </div>
            ) : (
              <Button onClick={stepper.reset}>Reset</Button>
            )} */}
            <>
              <div className="flex justify-end gap-4 pt-12">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={stepper.prev}
                  disabled={stepper.isFirst}>
                  Kembali
                </Button>
                {stepper?.current?.id === "data_verification" ? (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      stepper.next();
                    }}>
                    Lanjut
                  </Button>
                ) : (
                  <Button type="submit">
                    {stepper.isLast ? "Selesai" : "Periksa"}
                  </Button>
                )}
              </div>
            </>
            {/* {!stepper?.isFirst && (
              <>
                <div className="flex justify-end gap-4 pt-24">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={stepper.prev}
                    disabled={stepper.isFirst}>
                    Kembali
                  </Button>
                  {stepper?.current?.id === "data_verification" ? (
                    <Button onClick={() => stepper.next()}>Lanjut</Button>
                  ) : (
                    <Button type="submit">
                      {stepper.isLast ? "Selesai" : "Periksa"}
                    </Button>
                  )}
                </div>
              </>
            )} */}
          </div>
        </form>
      </Form>
    </>
  );
};

const RfidScan = ({isLoading}: {isLoading: boolean}) => {
  const {register} = useFormContext<z.infer<typeof rfidSchema>>();
  return (
    <div>
      <Empty className="border border-primary max-w-xl mx-auto mt-24">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SplitSquareVerticalIcon />
          </EmptyMedia>
          <EmptyTitle>Pindai Kartu RFID</EmptyTitle>
          <EmptyDescription>
            Arahkan kursor pada kolom input di bawah dan pindai kartu RFID untuk
            mencari anak
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <FormField
            {...register("rfid_tag")}
            defaultValue={""}
            name="rfid_tag"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Pindai Kartu"
                    {...field}
                    className="focus-visible:border-b-2 focus-visible:ring-ring/0 focus-visible:ring-0 border-0 shadow-none border-b-2 rounded-none w-28"
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </EmptyContent>
      </Empty>
    </div>
  );
};

const IdentitasAnak = ({anak}: {anak: z.infer<typeof anakSchema>}) => {
  return (
    <section>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Identitas Anak</CardTitle>
          <CardDescription>Biodata indentitas anak</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Item variant="outline" size="sm" className="w-full">
            <ItemMedia variant="icon">
              <User />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Nama Lengkap</ItemTitle>
              <ItemDescription>{anak?.nama}</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm" className="w-full">
            <ItemMedia variant="icon">
              <Users />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Nama Ibu</ItemTitle>
              <ItemDescription>{anak?.ibu?.nama}</ItemDescription>
            </ItemContent>
          </Item>
          <section className="flex gap-6">
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <CreditCard />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>NIK</ItemTitle>
                <ItemDescription>{anak?.nik}</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <Baby />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Jenis Kelamin</ItemTitle>
                <ItemDescription>
                  {anak?.jenis_kelamin === "P" ? "Perempuan" : "Laki-laki"}
                </ItemDescription>
              </ItemContent>
            </Item>
          </section>
          <section className="flex gap-6">
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <MapPinHouseIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Tempat Lahir</ItemTitle>
                <ItemDescription>{anak?.tempat_lahir}</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <CalendarIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Tanggal Lahir</ItemTitle>
                <ItemDescription>
                  {format(anak?.tanggal_lahir, "dd MMMM yyyy", {locale: id})}
                </ItemDescription>
              </ItemContent>
            </Item>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

const InputPemeriksaan = ({anak}: {anak: z.infer<typeof anakSchema>}) => {
  const {register, setValue} =
    useFormContext<z.infer<typeof pemeriksaanSchema>>();
  const [posyandu, setPosyandu] = useState<posyanduType>();
  const usiaBulan = calculateAgeInMonths(anak?.tanggal_lahir);

  useEffect(() => {
    const getAllPosyandu = async () => {
      try {
        const access_token = getCookie("access_token");
        const request = await fetch(appConfig.baseUrl + "/posyandu", {
          method: "GET",
          headers: {
            "Content-Type": " application/json",
            Authorization: `Bearer ${access_token}`,
          },
          cache: "no-store",
        });
        const response = await request.json();
        setPosyandu(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosyandu();
  }, [register]);

  useEffect(() => {
    setValue("anak_id", anak?.id);
    setValue("usia_bulan", usiaBulan);
    setValue("tanggal_pemeriksaan", new Date());
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pemeriksaan</CardTitle>
        <CardDescription>Input Data Pemeriksaan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="flex gap-6">
          <FormField
            {...register("anak_id")}
            defaultValue={""}
            name="anak_id"
            render={({field}) => (
              <FormItem className="hidden">
                <FormLabel>Anak</FormLabel>
                <FormControl>
                  <Input placeholder="Anak" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            {...register("posyandu_id")}
            defaultValue={""}
            name="posyandu_id"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Posyandu</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih posyandu" />
                    </SelectTrigger>
                    <SelectContent>
                      {posyandu?.map(({nama, id}) => (
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
            {...register("tanggal_pemeriksaan")}
            defaultValue={""}
            name="tanggal_pemeriksaan"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal Pemeriksaan</FormLabel>
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
                          // field.value.toLocaleDateString()
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
        <section className="flex gap-6">
          <FormField
            {...register("berat_badan")}
            defaultValue={""}
            name="berat_badan"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Berat Badan (kg)</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="Berat badan" {...field} />
                    <InputGroupAddon align="inline-end">kg</InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            {...register("tinggi_badan")}
            defaultValue={""}
            name="tinggi_badan"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tinggi Badan (cm)</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Tinggi / panjang badan"
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">cm</InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          {...register("usia_bulan")}
          defaultValue={""}
          name="usia_bulan"
          render={({field}) => (
            <FormItem className="w-full">
              <FormLabel>Umur (bulan)</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput placeholder="Umur" {...field} disabled />
                  <InputGroupAddon align="inline-end">bulan</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

const InsertHasilPemeriksaan = ({
  anak,
  zScodeResult,
  pemeriksaanData,
}: {
  anak: z.infer<typeof anakSchema>;
  zScodeResult: z.infer<typeof zScoreSchema>;
  pemeriksaanData: z.infer<typeof pemeriksaanSchema>;
}) => {
  const {register, setValue} =
    useFormContext<z.infer<typeof hasilPemeriksaanSchema>>();
  const [posyandu, setPosyandu] = useState<z.infer<typeof posyanduSchema>>();
  const usiaBulan = calculateAgeInMonths(anak?.tanggal_lahir);

  useEffect(() => {
    const getAllPosyandu = async () => {
      try {
        const access_token = getCookie("access_token");
        const request = await fetch(appConfig.baseUrl + "/posyandu", {
          method: "GET",
          headers: {
            "Content-Type": " application/json",
            Authorization: `Bearer ${access_token}`,
          },
          cache: "no-store",
        });
        const response = await request.json();
        setPosyandu(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosyandu();
  }, [register]);

  useEffect(() => {
    setValue("anakId", anak?.id);
    setValue("usiaBulan", usiaBulan);
    setValue("beratBadan", pemeriksaanData?.berat_badan);
    setValue("tinggiBadan", pemeriksaanData?.tinggi_badan);
    setValue(
      "tanggalPemeriksaan",
      new Date(pemeriksaanData?.tanggal_pemeriksaan),
    );
    setValue("statusBBU", zScodeResult?.data?.statusResult?.BBUStatusResult);
    setValue("statusTBU", zScodeResult?.data?.statusResult?.TBUStatusResult);
    setValue("posyanduId", pemeriksaanData?.posyandu_id as string);
    setValue("zScoreBBU", zScodeResult?.data?.scoreResult?.zScoreBBUResult);
    setValue("zScoreTBU", zScodeResult?.data?.scoreResult?.zScoreTBUResult);
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Pemeriksaan</CardTitle>
        <CardDescription>Data Hasil Pemeriksaan Anak</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="flex gap-6">
          <FormField
            {...register("anakId")}
            defaultValue={""}
            name="anakId"
            render={({field}) => (
              <FormItem className="hidden">
                <FormLabel>Anak</FormLabel>
                <FormControl>
                  <Input placeholder="Anak" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            {...register("zScoreBBU")}
            defaultValue={""}
            name="zScoreBBU"
            render={({field}) => (
              <FormItem className="hidden">
                <FormLabel>Anak</FormLabel>
                <FormControl>
                  <Input placeholder="zScoreBBU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            {...register("zScoreTBU")}
            defaultValue={""}
            name="zScoreTBU"
            render={({field}) => (
              <FormItem className="hidden">
                <FormLabel>Anak</FormLabel>
                <FormControl>
                  <Input placeholder="zScoreTBU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            {...register("posyanduId")}
            defaultValue={""}
            name="posyanduId"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Posyandu</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    disabled
                    onValueChange={field.onChange}
                    value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih posyandu" />
                    </SelectTrigger>
                    <SelectContent>
                      {posyandu?.map(({nama, id}) => (
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
            {...register("tanggalPemeriksaan")}
            defaultValue={""}
            name="tanggalPemeriksaan"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal Pemeriksaan</FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled>
                    <FormControl>
                      <Button
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
        <section className="flex gap-6">
          <FormField
            {...register("beratBadan")}
            defaultValue={""}
            name="beratBadan"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Berat Badan (kg)</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Berat badan"
                      {...field}
                      disabled
                    />
                    <InputGroupAddon align="inline-end">kg</InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            {...register("tinggiBadan")}
            defaultValue={""}
            name="tinggiBadan"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tinggi Badan (cm)</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      disabled
                      placeholder="Tinggi / panjang badan"
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">cm</InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          {...register("usiaBulan")}
          defaultValue={""}
          name="usiaBulan"
          render={({field}) => (
            <FormItem className="w-full">
              <FormLabel>Umur (bulan)</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput placeholder="Umur" disabled {...field} />
                  <InputGroupAddon align="inline-end">bulan</InputGroupAddon>
                </InputGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex gap-6">
          <FormField
            {...register("statusBBU")}
            name="statusBBU"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Status BB/U</FormLabel>
                <FormControl>
                  <Select
                    disabled
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bb_sangat_kurang">
                        <Badge className="bg-red-100 text-red-800">
                          <CircleXIcon
                            data-icon="inline-start"
                            className="text-red-800"
                          />{" "}
                          Berat Badan Sangat Kurang
                        </Badge>
                      </SelectItem>
                      <SelectItem value="bb_kurang">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <CircleAlertIcon
                            data-icon="inline-start"
                            className="text-yellow-800"
                          />{" "}
                          Berat Badan Kurang
                        </Badge>
                      </SelectItem>
                      <SelectItem value="bb_normal">
                        <Badge className="bg-green-100 text-green-900">
                          <CircleCheckIcon
                            data-icon="inline-start"
                            className="text-green-900"
                          />{" "}
                          Berat Badan Normal
                        </Badge>
                      </SelectItem>
                      <SelectItem value="risiko_bb_lebih">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <CircleAlertIcon
                            data-icon="inline-start"
                            className="text-yellow-800"
                          />{" "}
                          Risiko Berat Badan Berlebih
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
            {...register("statusTBU")}
            name="statusTBU"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Status TB/U</FormLabel>
                <FormControl>
                  <Select
                    disabled
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sangat_pendek">
                        <Badge
                          variant={"destructive"}
                          className="bg-red-100 text-red-800">
                          <CircleXIcon
                            data-icon="inline-start"
                            className="text-red-800"
                          />{" "}
                          Sangat Pendek
                        </Badge>
                      </SelectItem>
                      <SelectItem value="pendek">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <CircleAlertIcon
                            data-icon="inline-start"
                            className="text-yellow-800"
                          />{" "}
                          Pendek
                        </Badge>
                      </SelectItem>
                      <SelectItem value="normal">
                        <SelectItem value="bb_normal">
                          <Badge className="bg-green-100 text-green-900">
                            <CircleCheckIcon
                              data-icon="inline-start"
                              className="text-green-900"
                            />{" "}
                            Normal
                          </Badge>
                        </SelectItem>
                      </SelectItem>
                      <SelectItem value="tinggi">
                        <Badge className="bg-green-100 text-green-900">
                          <CircleCheckIcon
                            data-icon="inline-start"
                            className="text-green-900"
                          />{" "}
                          Tinggi
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          {...register("catatan")}
          name="catatan"
          render={({field}) => (
            <FormItem>
              <FormLabel>Catatan</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukan Catatan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CreatePemeriksaanPage;
