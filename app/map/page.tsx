export default function MapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Online map</h1>
      <p className="text-sm text-dd-muted mb-4">
        Embedded Dynmap instance. Make sure Dynmap is configured at the
        URL below.
      </p>
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/5">
        <iframe
          src="https://map.darkdown.xyz"
          className="h-full w-full border-0"
          title="DarkDowN Dynmap"
        />
      </div>
    </div>
  );
}
