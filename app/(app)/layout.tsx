import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/app/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />
      <main className="flex-1 overflow-auto pt-14 md:pt-0 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
