import { Card } from "@/components/ui/card";

export default function StorePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Store</h1>
      <Card>
        <p className="text-sm text-dd-muted">
          Store integration is planned with Stripe. Until then, all VIP
          purchases are handled manually through tickets in the VIP
          category.
        </p>
      </Card>
    </div>
  );
}
