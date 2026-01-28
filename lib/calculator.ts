import {GrowthPoint, Gender, StatusTBU, StatusBBU} from "@/data/growthData";
import {FULL_BB_BOYS, BB_GIRLS, TB_BOYS, TB_GIRLS} from "../data/growthData";

export const calculateStatusTBU = (
  usia_bulan: number,
  tinggi_badan: number,
  jenis_kelamin: Gender,
): StatusTBU => {
  const data = jenis_kelamin === "L" ? TB_BOYS : TB_GIRLS;
  const standard = data.find((d) => d.age === Math.round(usia_bulan));
  if (!standard) return "Normal";

  if (tinggi_badan < standard.sd_m3) return "Sangat Pendek";
  if (tinggi_badan < standard.sd_m2) return "Pendek";
  if (tinggi_badan > standard.sd_p3) return "Tinggi";
  return "Normal";
};

export const calculateStatusBBU = (
  usia_bulan: number,
  berat_badan: number,
  jenis_kelamin: Gender,
): StatusBBU => {
  const data = jenis_kelamin === "L" ? FULL_BB_BOYS : BB_GIRLS;
  const standard = data.find((d) => d.age === Math.round(usia_bulan));
  if (!standard) return "Berat Badan Normal";

  if (berat_badan < standard.sd_m3) return "Berat Badan Sangat Kurang";
  if (berat_badan < standard.sd_m2) return "Berat Badan Kurang";
  if (berat_badan > standard.sd_p1) return "Risiko Berat Badan Lebih";
  return "Berat Badan Normal";
};
