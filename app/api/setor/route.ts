import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Cek sesi pengguna yang sedang login
    const session = await getServerSession(authOptions); 
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Sesi tidak valid / Anda belum login" }, 
        { status: 401 }
      );
    }

    const pengguna = await prisma.pengguna.findUnique({
      where: { email: session.user.email },
    });

    if (!pengguna) {
      return NextResponse.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    const { lokasi, items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "Pilih minimal 1 jenis sampah" }, { status: 400 });
    }

    // 2. Ambil data harga resmi dari database untuk kalkulasi akurat
    const jenisIds = items.map((i: { id_jenis: number }) => Number(i.id_jenis));
    const dbJenisSampah = await prisma.jenis_sampah.findMany({
      where: { id_jenis: { in: jenisIds } },
    });

    const hargaMap = new Map(dbJenisSampah.map((j) => [j.id_jenis, Number(j.harga_per_kg)]));

    // 3. Hitung total nilai rupiah dan siapkan detail items
    let totalNominal = 0;
    const itemDetails = items.map((item: { id_jenis: number; berat_kg: number }) => {
      const hargaPerKg = Number(hargaMap.get(Number(item.id_jenis))) || 0;
      const subtotal = hargaPerKg * Number(item.berat_kg);
      totalNominal += subtotal;

      return {
        id_jenis: Number(item.id_jenis),
        berat_kg: Number(item.berat_kg),
      };
    });

    // 4. Jalankan Transaksi Atomic Prisma
    const result = await prisma.$transaction(async (tx) => {
      // A. Catat Laporan Sampah
      const laporan = await tx.laporan_sampah.create({
        data: {
          id_pengguna: pengguna.id_pengguna,
          lokasi: lokasi || "Bank Sampah Utama",
          tanggal_laporan: new Date(),
          status: "SELESAI",
          laporan_jenis: {
            create: itemDetails.map((item) => ({
              id_jenis: item.id_jenis,
              berat_kg: item.berat_kg,
            })),
          },
        },
      });

      // B. Catat Riwayat Mutasi (Pemasukan)
      const transaksi = await tx.transaksi.create({
        data: {
          id_pengguna: pengguna.id_pengguna,
          id_laporan: laporan.id_laporan,
          jenis_transaksi: "PEMASUKAN",
          nominal: totalNominal,
          keterangan: `Setor Sampah #${laporan.id_laporan} (${itemDetails.length} jenis)`,
        },
      });

      // C. Tambahkan Saldo ke Dompet Pengguna
      const dompet = await tx.dompet_pengguna.upsert({
        where: { id_pengguna: pengguna.id_pengguna },
        update: {
          saldo: { increment: totalNominal },
        },
        create: {
          id_pengguna: pengguna.id_pengguna,
          saldo: totalNominal,
        },
      });

      return { laporan, transaksi, dompet };
    });

    return NextResponse.json({
      message: "Setor sampah berhasil! Saldo Anda telah bertambah.",
      data: result,
    }, { status: 201 });

  } catch (error) {
    console.error("Error setor sampah:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}