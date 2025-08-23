import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const response = await fetch("https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/user/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch user info" }), { status: 500 });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
