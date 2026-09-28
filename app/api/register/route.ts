import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { nama, email, password } = await req.json();

    // 1. Validasi input dasar
    if (!nama || !email || !password) {
      return NextResponse.json({ message: "Semua field harus diisi" }, { status: 400 });
    }

    // 2. Cek apakah email sudah terdaftar sebelumnya
    const existingUser = await prisma.pengguna.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 });
    }

    // 3. Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan ke database dan sekaligus inisialisasi dompet saldonya
    const newUser = await prisma.pengguna.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        dompet_pengguna: {
          create: {
            saldo: 0
          }
        }
      },
    });

    return NextResponse.json({ message: "Registrasi berhasil", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}