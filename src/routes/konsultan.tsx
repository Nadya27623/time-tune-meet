import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { KonsultanCard } from "@/components/KonsultanCard";
import { konsultans } from "@/lib/data";

export const Route = createFileRoute("/konsultan")({
  head: () => ({
    meta: [
      { title: "Konsultan — DentalCare" },
      { name: "description", content: "Daftar dokter gigi tersertifikasi untuk konsultasi online." },
    ],
  }),
  component: KonsultanPage,
});

function KonsultanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-12">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold md:text-4xl">Konsultan kami</h1>
          <p className="mt-2 text-muted-foreground">
            Pilih dokter gigi yang sesuai dengan kebutuhan Anda.
          </p>
        </header>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {konsultans.map((k) => (
            <KonsultanCard key={k.id} k={k} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
