import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const navCls =
    "px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
  const activeCls = "bg-primary-soft text-primary";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">DentalCare</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/" className={navCls} activeOptions={{ exact: true }} activeProps={{ className: `${navCls} ${activeCls}` }}>
            Beranda
          </Link>
          <Link to="/konsultan" className={navCls} activeProps={{ className: `${navCls} ${activeCls}` }}>
            Konsultan
          </Link>
          <Link to="/booking" className={navCls} activeProps={{ className: `${navCls} ${activeCls}` }}>
            Booking
          </Link>
          <Link to="/janji-saya" className={navCls} activeProps={{ className: `${navCls} ${activeCls}` }}>
            Janji Saya
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login-dokter" className="hidden text-xs font-medium text-muted-foreground hover:text-foreground sm:inline">
            Login Dokter
          </Link>
          <Link to="/login-admin" className="hidden text-xs font-medium text-muted-foreground hover:text-foreground sm:inline">
            Login Admin
          </Link>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Masuk</Button>
          <Button size="sm">Daftar</Button>
        </div>
      </div>
    </header>
  );
}
