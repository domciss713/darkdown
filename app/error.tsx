"use client";

export default function GlobalError({
  error
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body className="dd-gradient-bg min-h-screen flex items-center justify-center text-center text-dd-text px-4">
        <div>
          <p className="text-4xl mb-2">Something went wrong</p>
          <p className="text-sm text-dd-muted">
            {error.message || "Unexpected error"}
          </p>
        </div>
      </body>
    </html>
  );
}
