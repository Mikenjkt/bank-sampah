import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Cek Sesi Pengguna
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Sesi tidak valid / Anda belum login" }, { status: 401 });
    }

    const pengguna = await prisma.pengguna.findUnique({
      where: { email: session.user.email },
      include: { dompet_pengguna: true },
    });

    if (!pengguna) {
      return NextResponse.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    const { nominal, metode, catatan } = await req.json();
    const jumlahTarik = Number(nominal);

    // 2. Validasi Input Nominal
    if (!jumlahTarik || jumlahTarik <= 0) {
      return NextResponse.json({ message: "Masukkan nominal penarikan yang valid" }, { status: 400 });
    }

    const saldoSaatIni = pengguna.dompet_pengguna?.saldo ? Number(pengguna.dompet_pengguna.saldo) : 0;

    // 3. Validasi Kecukupan Saldo
    if (jumlahTarik > saldoSaatIni) {
      return NextResponse.json({
        message: `Saldo tidak mencukupi. Saldo Anda saat ini: Rp ${saldoSaatIni.toLocaleString("id-ID")}`
      }, { status: 400 });
    }

    // 4. Jalankan Transaksi Atomic (Kurangi Saldo & Catat Transaksi Pengeluaran)
    const result = await prisma.$transaction(async (tx) => {
      // A. Catat Transaksi Pengeluaran
      const transaksi = await tx.transaksi.create({
        data: {
          id_pengguna: pengguna.id_pengguna,
          jenis_transaksi: "PENGELUARAN",
          nominal: jumlahTarik,
          keterangan: `Penarikan Saldo (${metode || 'Tunai'}) - ${catatan || 'Tarik Tunai Bank Sampah'}`,
        },
      });

      // B. Kurangi Saldo di Dompet Pengguna
      const dompet = await tx.dompet_pengguna.update({
        where: { id_pengguna: pengguna.id_pengguna },
        data: {
          saldo: { decrement: jumlahTarik },
        },
      });

      return { transaksi, dompet };
    });

    return NextResponse.json({
      message: "Penarikan saldo berhasil diproses!",
      saldoSisa: Number(result.dompet.saldo),
    }, { status: 200 });

  } catch (error) {
    console.error("Error tarik saldo:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}