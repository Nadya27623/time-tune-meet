import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShieldCheck, Video, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { KonsultanCard } from "@/components/KonsultanCard";
import { konsultans } from "@/lib/data";
import heroImg from "@/assets/hero-consultation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DentalCare — Konsultasi gigi online, cepat & tepat" },
      { name: "description", content: "Ceritakan keluhan gigi Anda, sistem kami merekomendasikan dokter gigi tepercaya & jadwal terbaik." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="container mx-auto grid items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Badge variant="secondary" className="bg-primary-soft text-primary">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Rekomendasi konsultan & waktu otomatis
              </Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Konsultasi gigi online,{" "}
                <span className="text-primary">cepat & tepat</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Ceritakan keluhan Anda, sistem kami akan merekomendasikan dokter gigi yang tepat beserta waktu terbaik untuk konsultasi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/booking"><Calendar className="mr-2 h-4 w-4" />Booking sekarang</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/konsultan">Lihat konsultan</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />Dokter tersertifikasi</span>
                <span className="inline-flex items-center gap-2"><Video className="h-4 w-4 text-primary" />Video call HD</span>
                <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Rekomendasi cerdas</span>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImg}
                alt="Konsultasi gigi online dengan dokter gigi"
                width={1280}
                height={960}
                className="rounded-3xl shadow-[var(--shadow-soft)]"
              />
            </div>
          </div>
        </section>

        {/* Cara kerja */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Cara kerja</h2>
            <p className="mt-2 text-muted-foreground">3 langkah sederhana untuk konsultasi</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: 1, t: "Ceritakan keluhan", d: "Isi keluhan, prioritas, dan preferensi waktu Anda." },
              { n: 2, t: "Pilih rekomendasi", d: "Sistem menyarankan konsultan & jadwal terbaik." },
              { n: 3, t: "Konsultasi online", d: "Booking dikonfirmasi, siap konsultasi via video call." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Konsultan unggulan */}
        <section className="container mx-auto px-4 pb-24">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Konsultan unggulan</h2>
              <p className="mt-2 text-muted-foreground">Pilih dari tim dokter gigi tersertifikasi.</p>
            </div>
            <Link to="/konsultan" className="hidden text-sm font-medium text-primary hover:underline sm:block">
              Lihat semua →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {konsultans.slice(0, 3).map((k) => (
              <KonsultanCard key={k.id} k={k} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
