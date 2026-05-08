import Sidebar from "@/components/layout/Sidebar";

// Shared layout for all app pages (dashboard, payroll, workers, payments, analytics, settings)
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
