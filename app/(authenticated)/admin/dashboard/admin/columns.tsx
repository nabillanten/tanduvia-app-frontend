"use client";
import z from "zod";
import {type ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import {
  CircleCheckIcon,
  CircleXIcon,
  EllipsisIcon,
  CircleAlertIcon,
  LucideIcon,
} from "lucide-react";
import {JenisKelaminEnum} from "../../../anak/columns";

const statusBBU = z.enum([
  "bb_sangat_kurang",
  "bb_kurang",
  "bb_normal",
  "risiko_bb_lebih",
]);

const statusTBU = z.enum(["sangat_pendek", "pendek", "normal", "tinggi"]);

const schema = z.object({
  id: z.string(),
  tanggal_pemeriksaan: z.string(),
  usia_bulan: z.string(),
  berat_badan: z.string(),
  tinggi_badan: z.string(),
  status_bb_u: statusBBU,
  status_tb_u: statusTBU,
  created_at: z.string(),
  catatan: z.string(),
  anak: z.object({
    nama: z.string(),
    nik: z.string(),
    jenis_kelamin: JenisKelaminEnum,
    tanggal_lahir: z.string(),
    tempat_lahir: z.string(),
  }),
  posyandu: z.object({
    nama: z.string(),
  }),
  petugas: z.object({
    nama: z.string(),
  }),
});

const jenisKelaminLabel: Record<string, string> = {
  L: "Laki-Laki",
  P: "Perempuan",
};

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "created_at",
    header: "Tanggal Periksa",
    cell: ({row}) => {
      const date = format(row.getValue("created_at"), "dd-MM-yyyy");
      return date;
    },
  },
  {
    accessorKey: "anak.nama",
    header: "Nama",
  },
  {
    accessorKey: "anak.jenis_kelamin",
    header: "Jenis Kelamin",
    cell: ({row}) => {
      const jenis_kelamin = row.original.anak.jenis_kelamin;
      return <p>{jenisKelaminLabel[jenis_kelamin] || jenis_kelamin}</p>;
    },
  },
  {
    accessorKey: "usia_bulan",
    header: "Usia",
    cell: ({row}) => {
      const usia_bulan = row.original.usia_bulan;
      return <p>{usia_bulan} bulan</p>;
    },
  },
  {
    accessorKey: "berat_badan",
    header: "Berat Badan",
    cell: ({row}) => {
      const berat_badan = row.original.berat_badan;
      return <p>{berat_badan} kg</p>;
    },
  },
  {
    accessorKey: "tinggi_badan",
    header: "Tinggi Badan",
    cell: ({row}) => {
      const tinggi_badan = row.original.tinggi_badan;
      return <p>{tinggi_badan} cm</p>;
    },
  },

  {
    accessorKey: "status_tb_u",
    header: "Status TB/U",
    cell: ({row}) => {
      const status = row.original.status_tb_u as string;

      // 1. Config Map untuk Status TB/U
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

      // 2. Ambil config
      const config = statusConfig[status];

      // Fallback jika value tidak dikenali
      if (!config) return <p>{status}</p>;

      const Icon = config.icon;

      // 3. Render Badge
      return (
        <Badge
          variant="outline"
          className={`flex w-fit items-center gap-1 ${config.className}`}>
          <Icon className="h-4 w-4" />
          <span>{config.label}</span>
        </Badge>
      );
    },
  },

  {
    accessorKey: "status_bb_u",
    header: "Status BB/U",
    cell: ({row}) => {
      const status = row.original.status_bb_u as string;

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

      // 2. Ambil config berdasarkan value status
      const config = statusConfig[status];

      // Fallback jika status tidak dikenali
      if (!config) return <p>{status}</p>;

      const Icon = config.icon;

      // 3. Render Badge
      return (
        <Badge
          variant="outline"
          className={`flex w-fit items-center gap-1 ${config.className}`}>
          <Icon className="h-4 w-4" />
          <span>{config.label}</span>
        </Badge>
      );
    },
  },
];
