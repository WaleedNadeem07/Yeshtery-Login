import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const response = await fetch("https://api-yeshtery.dev.meetusvr.com/v1/user/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // Important for Next.js edge/runtime: opt out of caching user-specific requests
    cache: "no-store",
  });

  if (!response.ok) {
    const status = response.status;
    return new Response(JSON.stringify({ error: "Failed to fetch user info" }), { status });
  }

  const data = await response.json();
  // Ensure we only return what we need
  const { id, name } = data || {};
  return new Response(JSON.stringify({ id, name }), { status: 200 });
}
