// Tipe untuk item makanan (array di dalam rekomendasi)
export interface RekomendasiItem {
  id: string;
  rekomendasi_id: string;
  nama_makanan: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

// Tipe utama Rekomendasi Gizi
export interface RekomendasiGizi {
  id: string;
  ahli_gizi_id: string;
  judul: string;
  deskripsi: string;
  usia_min: number;
  usia_max: number;
  jenis_indeks: string; // Contoh: "BB_U"
  target_status: string; // Contoh: "bb_normal"
  status: string; // Contoh: "published"
  catatan_admin: string | null; // Bisa string atau null
  created_at: string;
  updated_at: string;
  deleted: boolean;
  // Array of items
  rekomendasi_item: RekomendasiItem[]; 
}