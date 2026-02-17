// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyTurnstile } from "@/lib/turnstile";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email nebo nick", type: "text" },
        password: { label: "Heslo", type: "password" },
        turnstileToken: { label: "Turnstile token", type: "text" },
      },
      async authorize(credentials) {
        const identifier = credentials?.identifier?.toLowerCase().trim();
        const password = credentials?.password;
        const turnstileToken = credentials?.turnstileToken;

        if (!identifier || !password) return null;

        if (process.env.TURNSTILE_SECRET_KEY) {
          if (!turnstileToken) return null;
          const ok = await verifyTurnstile({ token: turnstileToken });
          if (!ok) return null;
        }

        const user = await prisma.user.findFirst({
          where: identifier.includes("@") ? { email: identifier } : { minecraftNick: identifier },
          select: {
            id: true,
            email: true,
            minecraftNick: true,
            role: true,
            passwordHash: true,
            emailVerifiedAt: true,
          },
        });

        if (!user?.passwordHash || !user.emailVerifiedAt) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.minecraftNick,
          role: user.role,
          minecraftNick: user.minecraftNick,
        } as any;
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role ?? "USER";
        token.minecraftNick = (user as any).minecraftNick ?? null;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        (session.user as any).id = (token as any).id ?? user?.id;
        (session.user as any).role = (token as any).role ?? (user as any)?.role ?? "USER";
        (session.user as any).minecraftNick = (token as any).minecraftNick ?? (user as any)?.minecraftNick ?? null;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  jwt: {
    maxAge: 30 * 60,
  },
};
