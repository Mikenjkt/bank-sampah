"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard Utama", path: "/dashboard" },
    { name: "Setor Sampah (Pemasukan)", path: "/dashboard/setor" },
    { name: "Tarik Saldo (Pengeluaran)", path: "/dashboard/tarik" },
    { name: "Buku Kas (Riwayat)", path: "/dashboard/buku-kas" },
    { name: "Pengaturan Akun", path: "/dashboard/pengaturan" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-4 bg-blue-950 font-bold text-xl border-b border-blue-800">
          BANK SAMPAH
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}
              className={`block p-3 rounded transition-colors ${
                pathname === item.path ? "bg-blue-700 border-l-4 border-yellow-400" : "hover:bg-blue-800"
              }`}>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER / TOPBAR */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-gray-700">Sistem Pengelolaan Terpadu</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Halo, Pengguna</span>
            <button onClick={() => signOut({ callbackUrl: '/login' })} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition">
              Keluar
            </button>
          </div>
        </header>

        {/* PAGES INJECTED HERE */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}