export async function verifyTurnstile(opts: {
  token: string;
  ip?: string | null;
}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", opts.token);
  if (opts.ip) form.append("remoteip", opts.ip);

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });

  const data = (await resp.json()) as { success?: boolean };
  return !!data.success;
}
