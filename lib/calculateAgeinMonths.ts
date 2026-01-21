export const calculateAgeInMonths = (dateString: string | Date) => {
  if (!dateString) return "0";

  const birthDate = new Date(dateString);
  const today = new Date();

  // Hitung selisih tahun * 12 + selisih bulan
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();

  // Koreksi: Jika tanggal hari ini lebih kecil dari tanggal lahir (belum ulang bulan)
  // Kurangi 1 bulan
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  // Mencegah hasil negatif (jika tanggal lahir di masa depan)
  return months < 0 ? "0" : months.toString();
};
