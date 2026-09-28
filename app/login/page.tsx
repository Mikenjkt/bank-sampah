"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) alert("Email atau password salah");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Login Sistem</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full border p-2 rounded"
            onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full border p-2 rounded"
            onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Masuk</button>
        </form>
        <p className="mt-4 text-sm text-center">Belum punya akun? <a href="/register" className="text-blue-600">Daftar</a></p>
      </div>
    </div>
  );
}