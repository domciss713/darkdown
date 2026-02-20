import { Resend } from "resend";
import { firstWords, parseIdList } from "@/lib/access";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function appName() {
  return process.env.APP_NAME || "DarkDowN";
}

function template(title: string, body: string) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;background:#0b0b12;color:#e7e7f7;padding:24px;border-radius:14px;border:1px solid #ffffff22;max-width:620px">
      <h2 style="margin:0 0 12px;color:#c4b5fd">${title}</h2>
      <div style="font-size:14px;color:#e7e7f7">${body}</div>
      <hr style="border:none;border-top:1px solid #ffffff22;margin:16px 0" />
      <p style="font-size:12px;color:#b6b6d1;margin:0">${appName()} • automatická zpráva</p>
    </div>
  `;
}

export async function sendVerifyEmail(to: string, url: string) {
  const resend = getResend();
  if (!resend) return;
  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  await resend.emails.send({
    from,
    to,
    subject: `Ověření emailu - ${appName()}`,
    html: template("Ověření emailu", `<p>Klikni na odkaz pro ověření:</p><p><a href="${url}" style="color:#a78bfa">${url}</a></p>`),
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
    html: template("Reset hesla", `<p>Klikni na odkaz a nastav nové heslo:</p><p><a href="${url}" style="color:#a78bfa">${url}</a></p>`),
  });
}

function ticketAdminRecipients(): string[] {
  return parseIdList(process.env.TICKET_ADMIN_EMAILS);
}

function ticketHelperRecipients(): string[] {
  return parseIdList(process.env.TICKET_HELPER_EMAILS);
}

export function getTicketStaffRecipientList(): string[] {
  return [...new Set([...ticketAdminRecipients(), ...ticketHelperRecipients()])];
}

export async function sendTicketCreatedEmail(opts: {
  ticketCode: string;
  ticketSubject: string;
  ticketCategory: string;
  body: string;
  authorEmail: string;
  authorNick: string;
}) {
  const resend = getResend();
  if (!resend) return;
  const from = process.env.MAIL_FROM || "onboarding@resend.dev";

  const adminTo = ticketAdminRecipients();
  if (adminTo.length > 0) {
    await resend.emails.send({
      from,
      to: adminTo,
      subject: `[Ticket ${opts.ticketCode}] Nový ticket`,
      html: template(
        "Nový ticket (admin přehled)",
        `<p><b>Kód:</b> ${opts.ticketCode}<br/><b>Předmět:</b> ${opts.ticketSubject}<br/><b>Kategorie:</b> ${opts.ticketCategory}</p>
         <p><b>Hráč:</b> ${opts.authorNick}<br/><b>Email:</b> ${opts.authorEmail}</p>
         <p><b>Zpráva:</b> ${firstWords(opts.body, 40)}</p>`
      ),
    });
  }

  const helperTo = ticketHelperRecipients();
  if (helperTo.length > 0) {
    await resend.emails.send({
      from,
      to: helperTo,
      subject: `[Ticket ${opts.ticketCode}] Nový ticket`,
      html: template(
        "Nový ticket (helper přehled)",
        `<p><b>Kód:</b> ${opts.ticketCode}<br/><b>Předmět:</b> ${opts.ticketSubject}<br/><b>Kategorie:</b> ${opts.ticketCategory}</p>
         <p><b>Hráč:</b> ${opts.authorNick}</p>
         <p><b>Zpráva:</b> ${firstWords(opts.body, 40)}</p>`
      ),
    });
  }
}

export async function sendTicketReplyEmail(opts: {
  to: string;
  ticketCode: string;
  ticketSubject: string;
  byStaff: boolean;
  replyBody: string;
}) {
  const resend = getResend();
  if (!resend) return;

  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  const who = opts.byStaff ? "od helpera/admina" : "od hráče";

  await resend.emails.send({
    from,
    to: opts.to,
    subject: `[Ticket ${opts.ticketCode}] Nová odpověď`,
    html: template(
      "Nová odpověď v ticketu",
      `<p>V ticketu <b>${opts.ticketCode}</b> (${opts.ticketSubject}) je nová odpověď ${who}.</p>
       <p><b>Náhled zprávy:</b> ${firstWords(opts.replyBody, 20)}</p>`
    ),
  });
}
