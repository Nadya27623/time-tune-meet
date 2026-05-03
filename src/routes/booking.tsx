import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { konsultans } from "@/lib/data";
import { toast } from "sonner";

const searchSchema = z.object({
  dokter: z.coerce.number().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Booking konsultasi — DentalCare" },
      { name: "description", content: "Ceritakan keluhan Anda dan dapatkan rekomendasi konsultan & jadwal." },
    ],
  }),
  component: BookingPage,
});

const slots = ["09:00", "10:30", "13:00", "15:30", "18:00"];

function BookingPage() {
  const { dokter } = Route.useSearch();
  const navigate = useNavigate();
  const preselected = useMemo(() => konsultans.find((k) => k.id === dokter), [dokter]);

  const [keluhan, setKeluhan] = useState("");
  const [prioritas, setPrioritas] = useState("normal");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | undefined>(preselected?.id);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>();

  const recommended = useMemo(() => {
    if (preselected) return preselected;
    const k = keluhan.toLowerCase();
    if (k.includes("kawat") || k.includes("rata")) return konsultans[0];
    if (k.includes("akar") || k.includes("sensitif") || k.includes("nyeri")) return konsultans[1];
    if (k.includes("putih") || k.includes("veneer") || k.includes("estetika")) return konsultans[2];
    if (k.includes("cabut") || k.includes("bungsu")) return konsultans[3];
    return konsultans[0];
  }, [keluhan, preselected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !tanggal || !selectedSlot) {
      toast.error("Lengkapi nama, tanggal, dan jam.");
      return;
    }
    const doctorId = selectedDoctor ?? recommended.id;
    const doctor = konsultans.find((k) => k.id === doctorId)!;
    const list = JSON.parse(localStorage.getItem("appointments") || "[]");
    list.push({
      id: crypto.randomUUID(),
      nama, keluhan, prioritas, tanggal, jam: selectedSlot,
      dokter: doctor.name, specialty: doctor.specialty,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("appointments", JSON.stringify(list));
    toast.success("Booking berhasil dibuat!");
    navigate({ to: "/janji-saya" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-12">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold md:text-4xl">Booking konsultasi</h1>
          <p className="mt-2 text-muted-foreground">
            Ceritakan keluhan Anda, sistem akan merekomendasikan konsultan & waktu terbaik.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6 rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama lengkap</Label>
              <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Mis. Andi Saputra" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keluhan">Ceritakan keluhan Anda</Label>
              <Textarea
                id="keluhan"
                rows={4}
                value={keluhan}
                onChange={(e) => setKeluhan(e.target.value)}
                placeholder="Mis. gigi sensitif saat minum dingin, ingin pasang kawat, gigi bungsu nyeri..."
              />
            </div>
            <div className="space-y-2">
              <Label>Prioritas</Label>
              <RadioGroup value={prioritas} onValueChange={setPrioritas} className="grid grid-cols-3 gap-3">
                {["normal", "segera", "darurat"].map((p) => (
                  <Label key={p} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-background p-3 capitalize has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft">
                    <RadioGroupItem value={p} />
                    {p}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Input id="tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Jam tersedia</Label>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        selectedSlot === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-primary/30 bg-primary-soft/40 p-6">
              <Badge className="bg-primary text-primary-foreground">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Rekomendasi
              </Badge>
              <h3 className="mt-3 font-semibold">{recommended.name}</h3>
              <p className="text-sm text-primary">{recommended.specialty}</p>
              <p className="mt-2 text-xs text-muted-foreground">{recommended.schedule}</p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="mb-3 text-sm font-medium">Atau pilih konsultan lain</p>
              <div className="space-y-2">
                {konsultans.map((k) => {
                  const active = (selectedDoctor ?? recommended.id) === k.id;
                  return (
                    <button
                      type="button"
                      key={k.id}
                      onClick={() => setSelectedDoctor(k.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                        active ? "border-primary bg-primary-soft/50" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                        {k.initials}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium">{k.name}</span>
                        <span className="block text-xs text-muted-foreground">{k.specialty}</span>
                      </span>
                      {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">Konfirmasi booking</Button>
          </aside>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
