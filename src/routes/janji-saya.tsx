import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Trash2, Video } from "lucide-react";
import { toast } from "sonner";

type Appointment = {
  id: string;
  nama: string;
  keluhan: string;
  prioritas: string;
  tanggal: string;
  jam: string;
  dokter: string;
  specialty: string;
  createdAt: string;
};

export const Route = createFileRoute("/janji-saya")({
  head: () => ({
    meta: [
      { title: "Janji Saya — DentalCare" },
      { name: "description", content: "Daftar booking konsultasi gigi Anda." },
    ],
  }),
  component: JanjiSayaPage,
});

function JanjiSayaPage() {
  const [items, setItems] = useState<Appointment[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("appointments") || "[]"));
  }, []);

  const remove = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem("appointments", JSON.stringify(next));
    toast.success("Janji dibatalkan.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-12">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Janji saya</h1>
            <p className="mt-2 text-muted-foreground">Daftar booking konsultasi yang sudah Anda buat.</p>
          </div>
          <Button asChild><Link to="/booking">Buat booking baru</Link></Button>
        </header>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <p className="text-muted-foreground">Belum ada janji konsultasi.</p>
            <Button asChild className="mt-4"><Link to="/booking">Booking sekarang</Link></Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {items.map((a) => (
              <article key={a.id} className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge className="bg-primary-soft text-primary capitalize">{a.prioritas}</Badge>
                    <h3 className="mt-2 font-semibold">{a.dokter}</h3>
                    <p className="text-sm text-primary">{a.specialty}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove(a.id)} aria-label="Batalkan">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{a.tanggal}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{a.jam}</span>
                </div>
                {a.keluhan && (
                  <p className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">"{a.keluhan}"</p>
                )}
                <Button className="mt-4 w-full" variant="outline">
                  <Video className="mr-2 h-4 w-4" />Mulai video call
                </Button>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
