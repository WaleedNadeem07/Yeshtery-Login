import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  redirect(token ? "/dashboard" : "/login");
}
