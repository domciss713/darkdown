export const dynamic = "force-dynamic";
export const revalidate = 0;

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function MePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;

  const hasSecret = !!process.env.AUTH_SECRET;

  if (!token) {
    return (
      <div style={{ margin: 40 }}>
        <h1>/me debug</h1>
        <p>session cookie: NONE</p>
        <p>AUTH_SECRET exists: {String(hasSecret)}</p>
      </div>
    );
  }

  if (!process.env.AUTH_SECRET) {
    return (
      <div style={{ margin: 40 }}>
        <h1>/me debug</h1>
        <p>session cookie: PRESENT</p>
        <p>AUTH_SECRET exists: false</p>
        <p>tohle je duvod - na netlify nemas AUTH_SECRET v runtime</p>
      </div>
    );
  }

  try {
    const payload = jwt.verify(token, process.env.AUTH_SECRET) as any;

    return (
      <div style={{ margin: 40 }}>
        <h1>/me debug</h1>
        <p>session cookie: PRESENT</p>
        <p>AUTH_SECRET exists: true</p>
        <p>jwt payload:</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(payload, null, 2)}</pre>
      </div>
    );
  } catch (e: any) {
    return (
      <div style={{ margin: 40 }}>
        <h1>/me debug</h1>
        <p>session cookie: PRESENT</p>
        <p>AUTH_SECRET exists: {String(hasSecret)}</p>
        <p>jwt verify: FAILED</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(e?.message || e)}</pre>
      </div>
    );
  }
}
