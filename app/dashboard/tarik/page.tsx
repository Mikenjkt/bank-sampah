"use client";
import { useEffect, useState } from "react";

export default function TarikSaldoPage() {
  const [saldo, setSaldo] = useState<number>(0);
  const [nominal, setNominal] = useState<string>("");
  const [metode, setMetode] = useState<string>("Tunai");
  const [catatan, setCatatan] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Saldo Pengguna saat Halaman Dimuat
  const fetchSaldo = async () => {
    try {
      const res = await fetch("/api/dompet");
      const data = await res.json();
      if (res.ok) {
        setSaldo(data.saldo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  // Preset Pilihan Nominal Cepat
  const OpsiNominal = [10000, 25000, 50000, 100000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const numericNominal = Number(nominal);

    if (numericNominal > saldo) {
      setMessage({ type: "error", text: "Nominal penarikan melebihi saldo aktif Anda." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/tarik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nominal: numericNominal,
          metode,
          catatan,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setSaldo(data.saldoSisa);
        setNominal("");
        setCatatan("");
      } else {
        setMessage({ type: "error", text: data.message || "Gagal melakukan penarikan" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Memuat data saldo...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* CARD TAMPILAN SALDO */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <p className="text-blue-200 text-sm font-medium">Saldo Tersedia untuk Ditarik</p>
          <h2 className="text-3xl font-bold mt-1">
            Rp {saldo.toLocaleString("id-ID")}
          </h2>
        </div>
        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm text-xs text-blue-100">
          Status: Aktif
        </div>
      </div>

      {/* FORM PENARIKAN */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Form Pencairan / Tarik Saldo</h1>
        <p className="text-gray-500 text-sm mb-6">Pilih nominal atau masukkan jumlah yang ingin ditarik.</p>

        {message && (
          <div className={`p-4 mb-6 rounded-md text-sm ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tombol Pilihan Cepat */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Pilihan Cepat
            </label>
            <div className="grid grid-cols-4 gap-2">
              {OpsiNominal.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setNominal(val.toString())}
                  className={`py-2 px-3 text-sm rounded border transition ${
                    nominal === val.toString()
                      ? "bg-blue-600 text-white border-blue-600 font-semibold"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  Rp {val.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </div>

          {/* Input Custom Nominal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nominal Penarikan (Rp)
            </label>
            <input
              type="number"
              min="1000"
              placeholder="Masukkan jumlah rupiah"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Pilihan Metode Penarikan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metode Pencairan
            </label>
            <select
              value={metode}
              onChange={(e) => setMetode(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Tunai">Tarik Tunai (Petugas Bank Sampah)</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="E-Wallet">E-Wallet (GoPay/OVO/Dana)</option>
            </select>
          </div>

          {/* Catatan / No Rekening */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan / No. Rekening / No. HP (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: BCA 123456789 a.n Budi"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || saldo <= 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Memproses Penarikan..." : "Konfirmasi Tarik Saldo"}
          </button>
        </form>
      </div>
    </div>
  );
}