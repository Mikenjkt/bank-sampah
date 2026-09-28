import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    let data = await prisma.jenis_sampah.findMany();

    // Auto-seed data awal jika tabel jenis_sampah di database masih kosong
    if (data.length === 0) {
      await prisma.jenis_sampah.createMany({
        data: [
          { nama_jenis: "Botol Plastik / PET", harga_per_kg: 3000 },
          { nama_jenis: "Kardus Bekas", harga_per_kg: 2000 },
          { nama_jenis: "Kertas / Majalah", harga_per_kg: 1500 },
          { nama_jenis: "Besi / Logam", harga_per_kg: 5000 },
          { nama_jenis: "Kaleng Aluminium", harga_per_kg: 8000 },
        ],
      });
      data = await prisma.jenis_sampah.findMany();
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching jenis sampah:", error);
    return NextResponse.json({ message: "Gagal mengambil data jenis sampah" }, { status: 500 });
  }
}