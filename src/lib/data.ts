export type Konsultan = {
  id: number;
  initials: string;
  name: string;
  specialty: string;
  bio: string;
  rating: number;
  experience: number;
  schedule: string;
};

export const konsultans: Konsultan[] = [
  {
    id: 1,
    initials: "AP",
    name: "drg. Andini Pratama",
    specialty: "Ortodonti",
    bio: "Spesialis kawat gigi & perataan gigi. Lulusan FKG UI dengan pengalaman 8 tahun.",
    rating: 4.9,
    experience: 8,
    schedule: "Senin–Jumat • 09:00–17:00",
  },
  {
    id: 2,
    initials: "BS",
    name: "drg. Budi Santoso, Sp.KG",
    specialty: "Endodonti",
    bio: "Pakar perawatan saluran akar dan gigi sensitif. Sudah menangani 3000+ pasien.",
    rating: 4.8,
    experience: 12,
    schedule: "Selasa–Sabtu • 10:00–18:00",
  },
  {
    id: 3,
    initials: "CH",
    name: "drg. Citra Halim",
    specialty: "Estetika Gigi",
    bio: "Ahli veneer, bleaching, dan smile design dengan pendekatan minimal invasif.",
    rating: 4.7,
    experience: 6,
    schedule: "Senin–Sabtu • 08:00–14:00",
  },
  {
    id: 4,
    initials: "DR",
    name: "drg. Dimas Rahman",
    specialty: "Bedah Mulut",
    bio: "Ahli pencabutan gigi bungsu dan bedah minor dengan teknik modern.",
    rating: 4.9,
    experience: 10,
    schedule: "Senin–Jumat • 13:00–20:00",
  },
];
