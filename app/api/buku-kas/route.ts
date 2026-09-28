import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Belum login" }, { status: 401 });
    }

    const pengguna = await prisma.pengguna.findUnique({
      where: { email: session.user.email },
      include: { dompet_pengguna: true },
    });

    if (!pengguna) {
      return NextResponse.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    // Ambil seluruh riwayat transaksi diurutkan dari yang paling lama ke paling baru (Ascending)
    // agar kalkulasi running balance berjalan tepat.
    const daftarTransaksi = await prisma.transaksi.findMany({
      where: { id_pengguna: pengguna.id_pengguna },
      orderBy: { tanggal: "asc" },
      include: {
        laporan_sampah: {
          include: {
            laporan_jenis: {
              include: { jenis_sampah: true },
            },
          },
        },
      },
    });

    // Hitung running balance & format data
    let runningBalance = 0;
    let totalPemasukan = 0;
    let totalPengeluaran = 0;

    const formattedData = daftarTransaksi.map((trx) => {
      const nominal = Number(trx.nominal);
      let debit = 0;
      let kredit = 0;

      if (trx.jenis_transaksi === "PEMASUKAN") {
        kredit = nominal; // Pemasukan (Kredit / Uang Masuk)
        runningBalance += nominal;
        totalPemasukan += nominal;
      } else {
        debit = nominal;  // Pengeluaran (Debit / Uang Keluar)
        runningBalance -= nominal;
        totalPengeluaran += nominal;
      }

      return {
        id_transaksi: trx.id_transaksi,
        tanggal: trx.tanggal,
        jenis_transaksi: trx.jenis_transaksi,
        keterangan: trx.keterangan,
        debit,
        kredit,
        saldo_berjalan: runningBalance,
        detail_sampah: trx.laporan_sampah?.laporan_jenis.map((lj) => ({
          nama: lj.jenis_sampah.nama_jenis,
          berat: Number(lj.berat_kg),
        })) || [],
      };
    });

    // Urutkan kembali dari yang terbaru (Descending) untuk kebutuhan tampilan tabel
    const reversedData = [...formattedData].reverse();

    return NextResponse.json({
      transaksi: reversedData,
      summary: {
        totalPemasukan,
        totalPengeluaran,
        saldoSaatIni: pengguna.dompet_pengguna?.saldo ? Number(pengguna.dompet_pengguna.saldo) : 0,
      },
    });
  } catch (error) {
    console.error("Error buku kas:", error);
    return NextResponse.json({ message: "Gagal mengambil data buku kas" }, { status: 500 });
  }
}