import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isAdminTokenValid } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/AdminLoginForm";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  // If already logged in, redirect to dashboard
  if (isAdminTokenValid(token)) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}
