import { Link } from "@tanstack/react-router";
import { Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Konsultan } from "@/lib/data";

export function KonsultanCard({ k }: { k: Konsultan }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground">
          {k.initials}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold leading-tight">{k.name}</h3>
          <Badge variant="secondary" className="mt-1 bg-primary-soft text-primary">{k.specialty}</Badge>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{k.bio}</p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{k.rating}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{k.experience} thn</span>
        <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{k.schedule}</span>
      </div>
      <Button asChild className="mt-5 w-full">
        <Link to="/booking" search={{ dokter: k.id }}>Booking sesi</Link>
      </Button>
    </article>
  );
}
