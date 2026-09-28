export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Saldo & Laporan</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
           <p className="text-sm text-gray-500">Total Saldo Aktif</p>
           <h3 className="text-2xl font-bold">Rp 0</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
           <p className="text-sm text-gray-500">Pemasukan Bulan Ini</p>
           <h3 className="text-2xl font-bold">Rp 0</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
           <p className="text-sm text-gray-500">Pengeluaran Bulan Ini</p>
           <h3 className="text-2xl font-bold">Rp 0</h3>
        </div>
      </div>
    </div>
  )
}