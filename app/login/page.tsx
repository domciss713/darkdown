import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaDiscord } from "react-icons/fa6";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/me");
  }

  const callbackUrl = "/me";

  return (
    <div className="flex justify-center">
      <Card className="max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <p className="text-sm text-dd-muted mb-4">
          Login with your Discord account to manage tickets and link
          your Minecraft profile.
        </p>
        <form
          action={`/api/auth/signin/discord?callbackUrl=${encodeURIComponent(
            callbackUrl
          )}`}
          method="post"
        >
          <Button type="submit" className="w-full flex items-center gap-2">
            <FaDiscord />
            Continue with Discord
          </Button>
        </form>
      </Card>
    </div>
  );
}
