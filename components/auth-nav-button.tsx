import Link from "next/link";

export function AuthNavButton({ loggedIn }: { loggedIn: boolean }) {
  if (!loggedIn) {
    return (
      <Link
        href="/login"
        className="text-sm text-dd-muted hover:text-dd-text"
      >
        Přihlásit se
      </Link>
    );
  }

  return (
    <form action="/api/auth/logout?next=/" method="post">
      <button
        type="submit"
        className="text-sm text-dd-muted hover:text-dd-text"
      >
        Odhlásit se
      </button>
    </form>
  );
}
