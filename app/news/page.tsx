import { Card } from "@/components/ui/card";

const posts = [
  {
    title: "DarkDowN web v2: účet + tickety",
    date: "2026-02-18",
    body: "Spustili jsme nový základ webu: přihlášení, účet hráče, tickety a admin/helper sekce.",
  },
  {
    title: "Příprava napojení na Minecraft server",
    date: "2026-02-22",
    body: "Dokončujeme rozhraní, aby šel web plynule propojit s MC server databází a rolemi bez přepisování frontendu.",
  },
  {
    title: "AT workflow a notifikace",
    date: "2026-02-26",
    body: "Přidali jsme základ helper dashboardu, role správu a e-mailové notifikace pro ticket support.",
  },
];

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Novinky</h1>
      <p className="text-sm text-dd-muted">Aktuální vývoj projektu, změny systému a roadmap milníky.</p>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.title}>
            <p className="text-xs text-dd-muted">{post.date}</p>
            <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-dd-muted">{post.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
