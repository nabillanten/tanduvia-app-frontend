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
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import fetchWithCredentials from "@/lib/fetchWithCredential";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {
  Baby,
  CalendarIcon,
  ChartNoAxesCombined,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  CreditCard,
  LucideIcon,
  MapPinHouseIcon,
  NotebookPen,
  Ruler,
  Undo2,
  User,
  Weight,
} from "lucide-react";
import Link from "next/link";

const getPemeriksaanById = async (id: string) => {
  const response = await fetchWithCredentials(`/pemeriksaan/${id}`);
  return response?.data;
};

const renderStatusBBU = (status: string) => {
  const statusConfig: Record<
    string,
    {label: string; icon: LucideIcon; className: string}
  > = {
    bb_sangat_kurang: {
      label: "Berat Badan Sangat Kurang",
      icon: CircleXIcon,
      className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
    },
    bb_kurang: {
      label: "Berat Badan Kurang",
      icon: CircleAlertIcon,
      className:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
    },
    bb_normal: {
      label: "Berat Badan Normal",
      icon: CircleCheckIcon,
      className:
        "bg-green-100 text-green-900 hover:bg-green-100 border-green-200",
    },
    risiko_bb_lebih: {
      label: "Risiko Berat Badan Berlebih",
      icon: CircleAlertIcon,
      className:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
    },
  };

  const config = statusConfig[status];

  if (!config) return <p>{status}</p>;

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`flex w-fit items-center gap-1 ${config.className}`}>
      <Icon className="h-4 w-4" />
      <span>{config.label}</span>
    </Badge>
  );
};

const renderStatusTBU = (status: string) => {
  const statusConfig: Record<
    string,
    {label: string; icon: LucideIcon; className: string}
  > = {
    sangat_pendek: {
      label: "Sangat Pendek",
      icon: CircleXIcon,
      className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
    },
    pendek: {
      label: "Pendek",
      icon: CircleAlertIcon,
      className:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
    },
    normal: {
      label: "Normal",
      icon: CircleCheckIcon,
      className:
        "bg-green-100 text-green-900 hover:bg-green-100 border-green-200",
    },
    tinggi: {
      label: "Tinggi",
      icon: CircleCheckIcon,
      className:
        "bg-green-100 text-green-900 hover:bg-green-100 border-green-200",
    },
  };

  const config = statusConfig[status];

  if (!config) return <p>{status}</p>;

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`flex w-fit items-center gap-1 ${config.className}`}>
      <Icon className="h-4 w-4" />
      <span>{config.label}</span>
    </Badge>
  );
};

const UpdatePemeriksaanPage = async ({
  params,
}: {
  params: Promise<{pemeriksaanId: string}>;
}) => {
  const {pemeriksaanId} = await params;
  const pemeriksaan = await getPemeriksaanById(pemeriksaanId);

  return (
    <section>
      <Card className="w-full">
        <CardHeader>
          <CardTitle> Identitas Anak</CardTitle>
          <CardDescription>Biodata indentitas anak</CardDescription>
          <CardAction>
            <Link href={"/pemeriksaan"}>
              <Button>
                <Undo2 /> Kembali
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <Item variant="outline" size="sm" className="w-full">
            <ItemMedia variant="icon">
              <User />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Nama Lengkap</ItemTitle>
              <ItemDescription>{pemeriksaan?.anak?.nama}</ItemDescription>
            </ItemContent>
          </Item>
          <section className="flex gap-4">
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <CreditCard />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>NIK</ItemTitle>
                <ItemDescription>{pemeriksaan?.anak?.nik}</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <Baby />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Jenis Kelamin</ItemTitle>
                <ItemDescription>
                  {pemeriksaan?.anak?.jenis_kelamin === "P"
                    ? "Perempuan"
                    : "Laki-laki"}
                </ItemDescription>
              </ItemContent>
            </Item>
          </section>
          <section className="flex gap-4">
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <MapPinHouseIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Tempat Lahir</ItemTitle>
                <ItemDescription>
                  {pemeriksaan?.anak?.tempat_lahir}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <CalendarIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Tanggal Lahir</ItemTitle>
                <ItemDescription>
                  {format(pemeriksaan?.anak?.tanggal_lahir, "dd MMMM yyyy", {
                    locale: id,
                  })}
                </ItemDescription>
              </ItemContent>
            </Item>
          </section>
        </CardContent>
        <hr className="my-4" />
        <CardHeader>
          <CardTitle>Hasil Pemeriksaan</CardTitle>
          <CardDescription>Data Hasil Pemeriksaan Anak</CardDescription>
          <CardAction className="underline flex items-center gap-2">
            <CalendarIcon size={18} />{" "}
            {format(pemeriksaan?.tanggal_pemeriksaan, "dd MMMM yyyy", {
              locale: id,
            })}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="flex gap-4">
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <MapPinHouseIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Usia</ItemTitle>
                <ItemDescription>
                  {pemeriksaan?.usia_bulan} Bulan
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <Weight />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Berat Badan</ItemTitle>
                <ItemDescription>{pemeriksaan?.berat_badan} kg</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <Ruler />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Tinggi Badan</ItemTitle>
                <ItemDescription>
                  {pemeriksaan?.tinggi_badan} cm
                </ItemDescription>
              </ItemContent>
            </Item>
          </section>
          <section className="flex gap-4">
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <ChartNoAxesCombined />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Status BB/U</ItemTitle>
                <ItemDescription>
                  {renderStatusBBU(pemeriksaan?.status_bb_u)}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="w-full">
              <ItemMedia variant="icon">
                <ChartNoAxesCombined />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Status TB/U</ItemTitle>
                <ItemDescription>
                  {renderStatusTBU(pemeriksaan?.status_tb_u)}
                </ItemDescription>
              </ItemContent>
            </Item>
          </section>
          <Item variant="outline" size="sm" className="w-full">
            <ItemMedia variant="icon">
              <NotebookPen />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Catatan</ItemTitle>
              <ItemDescription>
                {pemeriksaan?.catatan ? pemeriksaan?.catatan : "-"}
              </ItemDescription>
            </ItemContent>
          </Item>
        </CardContent>
      </Card>
    </section>
  );
};

export default UpdatePemeriksaanPage;
