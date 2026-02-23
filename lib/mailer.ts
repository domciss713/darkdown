import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function appName() {
  return process.env.APP_NAME || "DarkDowN";
}

export async function sendVerifyEmail(to: string, url: string) {
  const resend = getResend();
  if (!resend) return;

  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  await resend.emails.send({
    from,
    to,
    subject: `Ověření emailu - ${appName()}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Ověření emailu</h2>
        <p>Klikni na odkaz a potvrď email:</p>
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
    subject: `Reset hesla - ${appName()}`,
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

function parseRecipients(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function ticketStaffRecipients(): string[] {
  const admin = parseRecipients(process.env.TICKET_ADMIN_EMAILS);
  const helpers = parseRecipients(process.env.TICKET_HELPER_EMAILS);
  return [...new Set([...admin, ...helpers])];
}

export async function sendTicketCreatedEmail(opts: {
  ticketCode: string;
  ticketSubject: string;
  authorEmail: string;
}) {
  const resend = getResend();
  if (!resend) return;

  const recipients = ticketStaffRecipients();
  if (recipients.length === 0) return;

  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  await resend.emails.send({
    from,
    to: recipients,
    subject: `[Ticket ${opts.ticketCode}] Nový ticket`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Nový ticket</h2>
        <p><b>Kód:</b> ${opts.ticketCode}</p>
        <p><b>Předmět:</b> ${opts.ticketSubject}</p>
        <p><b>Autor:</b> ${opts.authorEmail}</p>
      </div>
    `,
  });
}

export async function sendTicketReplyEmail(opts: {
  to: string;
  ticketCode: string;
  ticketSubject: string;
  byStaff: boolean;
}) {
  const resend = getResend();
  if (!resend) return;

  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  const who = opts.byStaff ? "od helpera/admina" : "od hráče";

  await resend.emails.send({
    from,
    to: opts.to,
    subject: `[Ticket ${opts.ticketCode}] Nová odpověď`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Nová odpověď v ticketu</h2>
        <p>V ticketu <b>${opts.ticketCode}</b> (${opts.ticketSubject}) je nová odpověď ${who}.</p>
      </div>
    `,
  });
}

export function getTicketStaffRecipientList(): string[] {
  return ticketStaffRecipients();
}
