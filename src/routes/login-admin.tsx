import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/login-admin")({
  head: () => ({
    meta: [
      { title: "Login Admin — DentalCare" },
      {
        name: "description",
        content:
          "Portal masuk untuk Admin DentalCare. Admin hanya bertugas mengontrol akses pengguna dan memantau aktivitas sistem — bukan operator klinis.",
      },
      { property: "og:title", content: "Login Admin — DentalCare" },
      {
        property: "og:description",
        content: "Akses panel kontrol akses & monitoring sistem DentalCare.",
      },
    ],
  }),
  component: LoginAdminPage,
});

function LoginAdminPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ adminId: "", password: "", otp: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.adminId || !form.password || !form.otp) {
      toast.error("Admin ID, sandi, dan kode OTP wajib diisi");
      return;
    }
    if (form.otp.length !== 6) {
      toast.error("Kode OTP harus 6 digit");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "dentalcare_session",
        JSON.stringify({
          role: "admin",
          adminId: form.adminId,
          scope: ["access_control", "monitoring"],
          loginAt: Date.now(),
        }),
      );
      toast.success("Login admin berhasil");
      setLoading(false);
      navigate({ to: "/dashboard-admin" });
    }, 700);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* Info */}
          <div className="hidden flex-col justify-center md:flex">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Portal Admin
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight">Panel Kontrol & Monitoring</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
              Admin DentalCare bertanggung jawab atas tata kelola akses pengguna dan pengawasan
              sistem. Admin <strong>bukan operator klinis</strong>.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" /> Wewenang Admin
              </div>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>• Mengelola akun & hak akses dokter, pasien, staff</li>
                <li>• Monitoring aktivitas sistem dan audit log</li>
                <li>• Mengaktifkan / menonaktifkan akun yang mencurigakan</li>
                <li>• Melihat metrik & status layanan secara agregat</li>
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-destructive">
                <AlertTriangle className="h-4 w-4" /> Yang TIDAK boleh dilakukan Admin
              </div>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>✗ Input atau mengubah data pasien</li>
                <li>✗ Membuat / mengedit rekam medis</li>
                <li>✗ CRUD operasional harian klinis</li>
                <li>✗ Menjalankan tugas dokter (diagnosa, resep, konsultasi)</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">Masuk sebagai Admin</h2>
                <p className="text-xs text-muted-foreground">
                  Memerlukan 2-Factor Authentication (OTP)
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminId">Admin ID</Label>
                <Input
                  id="adminId"
                  placeholder="ADM-XXXX"
                  value={form.adminId}
                  onChange={(e) => setForm({ ...form, adminId: e.target.value })}
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
              <div className="space-y-2">
                <Label htmlFor="otp">Kode OTP (6 digit)</Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={form.otp}
                  onChange={(e) =>
                    setForm({ ...form, otp: e.target.value.replace(/\D/g, "").slice(0, 6) })
                  }
                />
                <p className="text-[11px] text-muted-foreground">
                  Buka aplikasi authenticator (Google Authenticator / Authy) untuk mendapatkan kode.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Memverifikasi..." : "Masuk dengan 2FA"}
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                Semua aktivitas login dicatat dalam audit log dan di-review berkala.
              </p>

              <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
                Bukan admin?{" "}
                <Link to="/login-dokter" className="text-primary hover:underline">
                  Login dokter
                </Link>{" "}
                ·{" "}
                <Link to="/" className="text-primary hover:underline">
                  Login pasien
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
