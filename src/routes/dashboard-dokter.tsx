import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Stethoscope,
  Calendar,
  Users,
  FileText,
  Clock,
  Star,
  LogOut,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/dashboard-dokter")({
  head: () => ({
    meta: [
      { title: "Dashboard Dokter — DentalCare" },
      {
        name: "description",
        content:
          "Dashboard dokter DentalCare: jadwal praktik, daftar pasien hari ini, rekam medis, dan ringkasan kinerja.",
      },
    ],
  }),
  component: DashboardDokter,
});

const stats = [
  { label: "Pasien Hari Ini", value: "8", icon: Users, hint: "+2 dari kemarin" },
  { label: "Selesai Konsultasi", value: "124", icon: CheckCircle2, hint: "Bulan ini" },
  { label: "Rating Pasien", value: "4.9", icon: Star, hint: "Dari 312 ulasan" },
  { label: "Jam Praktik", value: "32j", icon: Clock, hint: "Minggu ini" },
];

const jadwal = [
  { jam: "09:00", nama: "Rizki Aditya", keluhan: "Sakit gigi geraham", status: "Menunggu" },
  { jam: "09:45", nama: "Siti Nurhaliza", keluhan: "Konsultasi kawat gigi", status: "Menunggu" },
  { jam: "10:30", nama: "Bayu Pratama", keluhan: "Bleaching gigi", status: "Selesai" },
  { jam: "11:15", nama: "Dewi Lestari", keluhan: "Cabut gigi bungsu", status: "Berlangsung" },
  { jam: "13:00", nama: "Andre Wijaya", keluhan: "Kontrol kawat", status: "Menunggu" },
];

const rekam = [
  { nama: "Bayu Pratama", tanggal: "07 Mei 2026", diagnosa: "Pewarnaan gigi ekstrinsik", tindakan: "Bleaching in-office" },
  { nama: "Maya Putri", tanggal: "06 Mei 2026", diagnosa: "Karies media", tindakan: "Tambalan komposit" },
  { nama: "Iqbal Ramadhan", tanggal: "05 Mei 2026", diagnosa: "Maloklusi kelas II", tindakan: "Pemasangan bracket" },
];

function DashboardDokter() {
  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("dentalcare_session");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Topbar khusus dashboard dokter */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">DentalCare</p>
              <p className="text-[10px] uppercase tracking-wider text-primary">Practitioner</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold">drg. Andini Pratama</p>
              <p className="text-xs text-muted-foreground">Spesialis Ortodonti · STR aktif</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
              AP
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Greeting */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <Activity className="h-3.5 w-3.5" /> Sesi aktif · 30 menit
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Selamat pagi, dr. Andini 👋</h1>
            <p className="text-sm text-muted-foreground">Berikut ringkasan praktik dan jadwal hari ini.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4" /> Atur Jadwal
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4" /> Buat Rekam Medis
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <s.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </section>

        {/* Jadwal + Rekam medis */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Jadwal Pasien Hari Ini</h2>
                <p className="text-xs text-muted-foreground">Kamis, 7 Mei 2026</p>
              </div>
              <Button variant="ghost" size="sm">Lihat semua</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-2 pr-3 font-medium">Jam</th>
                    <th className="py-2 pr-3 font-medium">Pasien</th>
                    <th className="py-2 pr-3 font-medium">Keluhan</th>
                    <th className="py-2 pr-3 font-medium">Status</th>
                    <th className="py-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {jadwal.map((j) => (
                    <tr key={j.jam} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-3 font-mono text-foreground">{j.jam}</td>
                      <td className="py-3 pr-3 font-medium">{j.nama}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{j.keluhan}</td>
                      <td className="py-3 pr-3">
                        <span
                          className={
                            "rounded-full px-2.5 py-0.5 text-xs font-medium " +
                            (j.status === "Selesai"
                              ? "bg-primary-soft text-primary"
                              : j.status === "Berlangsung"
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-muted-foreground")
                          }
                        >
                          {j.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm">Detail</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Rekam Medis Terbaru</h2>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="space-y-4">
              {rekam.map((r) => (
                <li key={r.nama} className="rounded-xl border border-border bg-background p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{r.nama}</p>
                    <span className="text-[11px] text-muted-foreground">{r.tanggal}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Dx:</span> {r.diagnosa}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Tx:</span> {r.tindakan}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
