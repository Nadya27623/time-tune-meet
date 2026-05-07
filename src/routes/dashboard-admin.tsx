import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
  Activity,
  AlertTriangle,
  LogOut,
  Lock,
  Eye,
  ServerCog,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/dashboard-admin")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — DentalCare" },
      {
        name: "description",
        content:
          "Panel kontrol akses & monitoring DentalCare. Admin hanya melihat metrik agregat dan mengelola hak akses — bukan operator klinis.",
      },
    ],
  }),
  component: DashboardAdmin,
});

const stats = [
  { label: "Total Pengguna", value: "1.248", icon: Users, hint: "Dokter, pasien, staff" },
  { label: "Akun Aktif", value: "1.197", icon: UserCheck, hint: "+12 minggu ini" },
  { label: "Akun Ditangguhkan", value: "8", icon: UserX, hint: "Perlu review" },
  { label: "Uptime Sistem", value: "99.98%", icon: ServerCog, hint: "30 hari terakhir" },
];

const akses = [
  { nama: "drg. Andini Pratama", peran: "Dokter", status: "Aktif", terakhir: "5 mnt lalu" },
  { nama: "drg. Budi Santoso", peran: "Dokter", status: "Aktif", terakhir: "12 mnt lalu" },
  { nama: "Rizki Aditya", peran: "Pasien", status: "Aktif", terakhir: "1 jam lalu" },
  { nama: "Operator Klinik 02", peran: "Staff", status: "Ditangguhkan", terakhir: "2 hari lalu" },
  { nama: "drg. Citra Halim", peran: "Dokter", status: "Pending Verifikasi", terakhir: "—" },
];

const audit = [
  { waktu: "10:42", aksi: "Login admin berhasil (2FA)", aktor: "ADM-001", level: "info" },
  { waktu: "10:31", aksi: "Akun staff #SF-204 ditangguhkan", aktor: "ADM-001", level: "warn" },
  { waktu: "10:18", aksi: "Percobaan login gagal × 5", aktor: "203.0.113.42", level: "error" },
  { waktu: "09:55", aksi: "Verifikasi STR drg. Citra Halim disetujui", aktor: "ADM-002", level: "info" },
  { waktu: "09:30", aksi: "Backup database harian selesai", aktor: "system", level: "info" },
];

function DashboardAdmin() {
  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("dentalcare_session");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Topbar admin */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">DentalCare</p>
              <p className="text-[10px] uppercase tracking-wider text-foreground/70">Admin Console</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold">ADM-001 · Rina Hartono</p>
              <p className="text-xs text-muted-foreground">Akses: kontrol & monitoring</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Banner batas wewenang */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Anda berada di mode Admin — bukan operator klinis.
              </p>
              <p className="text-xs text-muted-foreground">
                Tidak dapat input data pasien, edit rekam medis, atau menjalankan tugas dokter.
                Tindakan terbatas pada kontrol akses & monitoring.
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
            <Lock className="h-3 w-3" /> Read-only klinis
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Panel Kontrol & Monitoring</h1>
        <p className="text-sm text-muted-foreground">Ringkasan tata kelola akses dan kesehatan sistem.</p>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground">
                  <s.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </section>

        {/* Manajemen akses + audit */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Manajemen Akses Pengguna</h2>
                <p className="text-xs text-muted-foreground">
                  Aktifkan, tangguhkan, atau verifikasi akun. Admin tidak dapat mengubah data klinis.
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4" /> Semua Pengguna
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-2 pr-3 font-medium">Nama</th>
                    <th className="py-2 pr-3 font-medium">Peran</th>
                    <th className="py-2 pr-3 font-medium">Status</th>
                    <th className="py-2 pr-3 font-medium">Aktivitas</th>
                    <th className="py-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {akses.map((u) => (
                    <tr key={u.nama} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-3 font-medium">{u.nama}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{u.peran}</td>
                      <td className="py-3 pr-3">
                        <span
                          className={
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
                            (u.status === "Aktif"
                              ? "bg-primary-soft text-primary"
                              : u.status === "Ditangguhkan"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-muted text-muted-foreground")
                          }
                        >
                          {u.status === "Aktif" && <CheckCircle2 className="h-3 w-3" />}
                          {u.status === "Ditangguhkan" && <XCircle className="h-3 w-3" />}
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-xs text-muted-foreground">{u.terakhir}</td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm">Kelola</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Audit Log</h2>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="space-y-3">
              {audit.map((a, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-border bg-background p-3">
                  <span
                    className={
                      "mt-1 h-2 w-2 shrink-0 rounded-full " +
                      (a.level === "error"
                        ? "bg-destructive"
                        : a.level === "warn"
                          ? "bg-amber-500"
                          : "bg-primary")
                    }
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug">{a.aksi}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {a.waktu} · oleh {a.aktor}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-3 w-full">
              Lihat semua log
            </Button>
          </div>
        </section>

        {/* Status sistem */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { label: "API Service", status: "Operasional" },
            { label: "Database", status: "Operasional" },
            { label: "Notifikasi (Email/SMS)", status: "Degraded" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">{s.label}</p>
              </div>
              <span
                className={
                  "rounded-full px-2.5 py-0.5 text-xs font-medium " +
                  (s.status === "Operasional"
                    ? "bg-primary-soft text-primary"
                    : "bg-amber-500/15 text-amber-700")
                }
              >
                {s.status}
              </span>
            </div>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
