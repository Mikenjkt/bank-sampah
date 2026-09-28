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

    const saldo = pengguna?.dompet_pengguna?.saldo ? Number(pengguna.dompet_pengguna.saldo) : 0;

    return NextResponse.json({ saldo });
  } catch (error) {
    console.error("Error get saldo:", error);
    return NextResponse.json({ message: "Gagal mengambil data saldo" }, { status: 500 });
  }
}