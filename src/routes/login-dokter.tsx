import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Stethoscope, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/login-dokter")({
  head: () => ({
    meta: [
      { title: "Login Dokter — DentalCare" },
      {
        name: "description",
        content:
          "Portal masuk khusus dokter gigi tersertifikasi DentalCare untuk mengelola jadwal praktik, rekam medis, dan konsultasi pasien.",
      },
      { property: "og:title", content: "Login Dokter — DentalCare" },
      {
        property: "og:description",
        content: "Akses dashboard dokter DentalCare: jadwal, pasien, dan rekam medis.",
      },
    ],
  }),
  component: LoginDokterPage,
});

function LoginDokterPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ str: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.str || !form.email || !form.password) {
      toast.error("Lengkapi semua field terlebih dahulu");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "dentalcare_session",
        JSON.stringify({ role: "dokter", email: form.email, str: form.str, loginAt: Date.now() }),
      );
      toast.success("Login dokter berhasil");
      setLoading(false);
      navigate({ to: "/dashboard-dokter" });
    }, 700);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* Side info */}
          <div className="hidden flex-col justify-center md:flex">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <Stethoscope className="h-3.5 w-3.5" /> Portal Dokter
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              Selamat datang kembali, Dokter.
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">
              Kelola jadwal praktik, baca keluhan pasien sebelum sesi, dan tulis rekam medis dalam
              satu tempat. Akses ini hanya untuk dokter gigi tersertifikasi DentalCare.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                Verifikasi STR & SIP dilakukan oleh tim Admin sebelum akun aktif.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                Sesi otomatis berakhir setelah 30 menit tidak aktif.
              </li>
            </ul>
          </div>

          {/* Form card */}
          <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Stethoscope className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">Masuk sebagai Dokter</h2>
                <p className="text-xs text-muted-foreground">DentalCare Practitioner Portal</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="str">Nomor STR</Label>
                <Input
                  id="str"
                  placeholder="cth. 1234567890123456"
                  value={form.str}
                  onChange={(e) => setForm({ ...form, str: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dokter@dentalcare.id"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                    aria-label="Toggle password"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-border" />
                  Ingat saya
                </label>
                <a className="font-medium text-primary hover:underline" href="#">
                  Lupa sandi?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Memverifikasi..." : "Masuk"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Belum terdaftar sebagai mitra dokter?{" "}
                <a href="mailto:partner@dentalcare.id" className="font-medium text-primary hover:underline">
                  Hubungi tim kemitraan
                </a>
              </p>

              <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
                Bukan dokter?{" "}
                <Link to="/" className="text-primary hover:underline">
                  Login sebagai pasien
                </Link>{" "}
                ·{" "}
                <Link to="/login-admin" className="text-primary hover:underline">
                  Login admin
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
