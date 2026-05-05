import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin Login", robots: { index: false } };

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password") as string;
  const secret = process.env.ADMIN_SECRET;

  if (!secret || password !== secret) return;

  const cookieStore = await cookies();
  cookieStore.set("admin_session", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
  });

  redirect("/admin/send");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session && session === process.env.ADMIN_SECRET) {
    redirect("/admin/send");
  }

  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-8">
        <h1 className="text-xl font-bold text-slate-900 mb-1">OSChoices Admin</h1>
        <p className="text-sm text-slate-500 mb-6">Enter your admin password to continue.</p>

        <form action={login} className="flex flex-col gap-3">
          <input
            type="password"
            name="password"
            placeholder="Admin secret"
            required
            autoFocus
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          {error && (
            <p className="text-sm text-red-600">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
