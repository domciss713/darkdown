import { Card } from "@/components/ui/card";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">News</h1>
      <Card>
        <p className="text-sm text-dd-muted">
          News posts are not implemented as CMS yet. For now this page
          can be edited directly in code to communicate important
          announcements.
        </p>
      </Card>
    </div>
  );
}
