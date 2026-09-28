"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Pendaftaran berhasil! Silakan Login.");
        router.push("/login"); 
      } else {
        setErrorMsg(data.message || "Gagal mendaftar");
      }
    } catch (error) {
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Daftar Akun Bank Sampah</h2>
        
        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" required className="w-full border p-2 rounded"
            onChange={e => setForm({...form, nama: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full border p-2 rounded"
            onChange={e => setForm({...form, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full border p-2 rounded"
            onChange={e => setForm({...form, password: e.target.value})} />
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">Sudah punya akun? <a href="/login" className="text-blue-600">Login</a></p>
      </div>
    </div>
  );
}