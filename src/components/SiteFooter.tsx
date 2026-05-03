export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DentalCare. Konsultasi gigi online tepercaya.
      </div>
    </footer>
  );
}
