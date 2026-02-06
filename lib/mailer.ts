import { Resend } from "resend";
import { Button } from "@/components/ui/button";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendVerifyEmail(to: string, url: string) {
  const resend = getResend();
  if (!resend) return; // bez klice nic neposilej

  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  await resend.emails.send({
    from,
    to,
    subject: "Ověření emailu - DarkDowN",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Ověření emailu</h2>
        <p>Klikni na odkaz a potvrď email:</p>
        <Button><a href="${url}">Potvrdit email</a></Button>
        <p><a href="${url}">${url}</a></p>
        <p>Pokud jsi to nebyl ty, ignoruj to.</p>
      </div>
    `,
  });
}

export async function sendResetEmail(to: string, url: string) {
  const resend = getResend();
  if (!resend) return;

  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  await resend.emails.send({
    from,
    to,
    subject: "Reset hesla - DarkDowN",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Reset hesla</h2>
        <p>Klikni na odkaz a nastav si nové heslo:</p>
        <p><a href="${url}">${url}</a></p>
        <p>Pokud jsi to nebyl ty, ignoruj to.</p>
      </div>
    `,
  });
}
