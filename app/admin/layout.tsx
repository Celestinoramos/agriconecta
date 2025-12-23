import { Sidebar } from "@/components/admin/Sidebar";
import "@/app/globals.css"; // se tiveres tailwind/global styles

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}