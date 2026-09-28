"use client";
import { useEffect, useState } from "react";

interface DetailSampah {
  nama: string;
  berat: number;
}

interface Transaksi {
  id_transaksi: number;
  tanggal: string;
  jenis_transaksi: string;
  keterangan: string;
  debit: number;
  kredit: number;
  saldo_berjalan: number;
  detail_sampah: DetailSampah[];
}

interface Summary {
  totalPemasukan: number;
  totalPengeluaran: number;
  saldoSaatIni: number;
}

export default function BukuKasPage() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalPemasukan: 0,
    totalPengeluaran: 0,
    saldoSaatIni: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBukuKas() {
      try {
        const res = await fetch("/api/buku-kas");
        const data = await res.json();
        if (res.ok) {
          setTransaksi(data.transaksi);
          setSummary(data.summary);
        }
      } catch (err) {
        console.error("Error fetching buku kas:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBukuKas();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Memuat Buku Kas Umum...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER DAN STATISTIK RINGKASAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Buku Kas Umum (BKU)</h1>
          <p className="text-gray-500 text-sm">
            Laporan lengkap mutasi debit, kredit, dan akumulasi saldo bank sampah.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="self-start md:self-auto bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm transition font-medium"
        >
          🖨️ Cetak / Export PDF
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border shadow-sm border-l-4 border-l-green-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Total Pemasukan (Setor)
          </span>
          <span className="text-2xl font-bold text-green-600 mt-1 block">
            Rp {summary.totalPemasukan.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="bg-white p-5 rounded-lg border shadow-sm border-l-4 border-l-red-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Total Pengeluaran (Tarik)
          </span>
          <span className="text-2xl font-bold text-red-600 mt-1 block">
            Rp {summary.totalPengeluaran.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="bg-white p-5 rounded-lg border shadow-sm border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Saldo Akhir Kas
          </span>
          <span className="text-2xl font-bold text-blue-900 mt-1 block">
            Rp {summary.saldoSaatIni.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* TABEL MUTASI BKU */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Rincian Transaksi</h2>
          <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2.5 py-1 rounded-full">
            {transaksi.length} Transaksi Dicatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-900 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">No. Transaksi</th>
                <th className="px-4 py-3">Tanggal & Waktu</th>
                <th className="px-4 py-3">Keterangan / Rincian</th>
                <th className="px-4 py-3 text-right">Pemasukan (Kredit)</th>
                <th className="px-4 py-3 text-right">Pengeluaran (Debit)</th>
                <th className="px-4 py-3 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transaksi.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    Belum ada riwayat transaksi yang tercatat.
                  </td>
                </tr>
              ) : (
                transaksi.map((trx) => (
                  <tr key={trx.id_transaksi} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-gray-600 text-xs font-bold">
                      TRX-{trx.id_transaksi.toString().padStart(4, "0")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {new Date(trx.tanggal).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{trx.keterangan}</p>
                      {trx.detail_sampah.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {trx.detail_sampah.map((item, i) => (
                            <span
                              key={i}
                              className="inline-block bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded border"
                            >
                              {item.nama}: {item.berat} kg
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-green-600 whitespace-nowrap">
                      {trx.kredit > 0 ? `+ Rp ${trx.kredit.toLocaleString("id-ID")}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-red-600 whitespace-nowrap">
                      {trx.debit > 0 ? `- Rp ${trx.debit.toLocaleString("id-ID")}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900 whitespace-nowrap">
                      Rp {trx.saldo_berjalan.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}