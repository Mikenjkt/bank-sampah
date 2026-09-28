"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface JenisSampah {
  id_jenis: number;
  nama_jenis: string;
  harga_per_kg: string | number;
}

interface ItemInput {
  id_jenis: number;
  berat_kg: number;
}

export default function SetorSampahPage() {
  const router = useRouter();
  const [daftarJenis, setDaftarJenis] = useState<JenisSampah[]>([]);
  const [lokasi, setLokasi] = useState("");
  const [items, setItems] = useState<ItemInput[]>([{ id_jenis: 0, berat_kg: 0 }]);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch daftar jenis sampah dari API saat halaman dimuat
  useEffect(() => {
    async function loadJenisSampah() {
      try {
        const res = await fetch("/api/jenis-sampah");
        const data = await res.json();
        if (res.ok) {
          setDaftarJenis(data);
          if (data.length > 0) {
            setItems([{ id_jenis: data[0].id_jenis, berat_kg: 1 }]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    }
    loadJenisSampah();
  }, []);

  // Tambah baris item baru
  const tambahBaris = () => {
    if (daftarJenis.length > 0) {
      setItems([...items, { id_jenis: daftarJenis[0].id_jenis, berat_kg: 1 }]);
    }
  };

  // Hapus baris item
  const hapusBaris = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Handler ubah data item
  const updateItem = (index: number, field: keyof ItemInput, value: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  // Hitung Estimasi Total Pendapatan secara Real-time
  const hitungTotalEstimasim = () => {
    return items.reduce((total, item) => {
      const jenis = daftarJenis.find((j) => j.id_jenis === Number(item.id_jenis));
      const harga = jenis ? Number(jenis.harga_per_kg) : 0;
      return total + harga * (Number(item.berat_kg) || 0);
    }, 0);
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/setor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lokasi, items }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        // Reset form
        setLokasi("");
        if (daftarJenis.length > 0) {
          setItems([{ id_jenis: daftarJenis[0].id_jenis, berat_kg: 1 }]);
        }
      } else {
        setMessage({ type: "error", text: data.message || "Gagal menyimpan laporan" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Memuat jenis sampah...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-900 mb-2">Form Setor Sampah (Pemasukan)</h1>
      <p className="text-gray-600 text-sm mb-6">
        Isi detail jenis sampah dan beratnya untuk menambahkan saldo ke dompet pengguna.
      </p>

      {message && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lokasi Penyetoran / TPS
          </label>
          <input
            type="text"
            placeholder="Contoh: Bank Sampah RW 05 / Lapangan Utama"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Tabel Penambahan Item */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rincian Sampah
          </label>
          <div className="space-y-3">
            {items.map((item, idx) => {
              const selectedJenis = daftarJenis.find((j) => j.id_jenis === Number(item.id_jenis));
              const hargaUnit = selectedJenis ? Number(selectedJenis.harga_per_kg) : 0;
              const subtotal = hargaUnit * (item.berat_kg || 0);

              return (
                <div key={idx} className="flex gap-3 items-center bg-gray-50 p-3 rounded border">
                  {/* Pilihan Jenis */}
                  <select
                    value={item.id_jenis}
                    onChange={(e) => updateItem(idx, "id_jenis", Number(e.target.value))}
                    className="flex-1 border p-2 rounded text-sm bg-white"
                    required
                  >
                    {daftarJenis.map((j) => (
                      <option key={j.id_jenis} value={j.id_jenis}>
                        {j.nama_jenis} - Rp {Number(j.harga_per_kg).toLocaleString("id-ID")}/kg
                      </option>
                    ))}
                  </select>

                  {/* Input Berat */}
                  <div className="w-32 flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={item.berat_kg || ""}
                      onChange={(e) => updateItem(idx, "berat_kg", parseFloat(e.target.value) || 0)}
                      className="w-full border p-2 rounded text-sm text-right bg-white"
                      placeholder="0.0"
                      required
                    />
                    <span className="text-xs text-gray-500">kg</span>
                  </div>

                  {/* Subtotal */}
                  <div className="w-36 text-right font-medium text-sm text-gray-700">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </div>

                  {/* Tombol Hapus */}
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => hapusBaris(idx)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={tambahBaris}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Tambah Jenis Sampah Lain
          </button>
        </div>

        {/* Box Summary Total */}
        <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center border border-blue-200">
          <div>
            <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider block">
              Total Estimasi Pendapatan
            </span>
            <span className="text-2xl font-bold text-blue-900">
              Rp {hitungTotalEstimasim().toLocaleString("id-ID")}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Konfirmasi & Simpan Setoran"}
          </button>
        </div>
      </form>
    </div>
  );
}