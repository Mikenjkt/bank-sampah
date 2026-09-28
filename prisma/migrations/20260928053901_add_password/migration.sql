-- CreateTable
CREATE TABLE "jenis_sampah" (
    "id_jenis" SERIAL NOT NULL,
    "nama_jenis" VARCHAR(50) NOT NULL,
    "harga_per_kg" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "jenis_sampah_pkey" PRIMARY KEY ("id_jenis")
);

-- CreateTable
CREATE TABLE "laporan_jenis" (
    "id_laporan" INTEGER NOT NULL,
    "id_jenis" INTEGER NOT NULL,
    "berat_kg" DECIMAL(5,2),

    CONSTRAINT "laporan_jenis_pkey" PRIMARY KEY ("id_laporan","id_jenis")
);

-- CreateTable
CREATE TABLE "laporan_sampah" (
    "id_laporan" SERIAL NOT NULL,
    "id_pengguna" INTEGER NOT NULL,
    "lokasi" TEXT,
    "tanggal_laporan" DATE,
    "status" VARCHAR(20),

    CONSTRAINT "laporan_sampah_pkey" PRIMARY KEY ("id_laporan")
);

-- CreateTable
CREATE TABLE "pengguna" (
    "id_pengguna" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "no_hp" VARCHAR(20),

    CONSTRAINT "pengguna_pkey" PRIMARY KEY ("id_pengguna")
);

-- CreateTable
CREATE TABLE "profil_pengguna" (
    "id_pengguna" INTEGER NOT NULL,
    "alamat" TEXT,
    "tanggal_lahir" DATE,

    CONSTRAINT "profil_pengguna_pkey" PRIMARY KEY ("id_pengguna")
);

-- CreateTable
CREATE TABLE "dompet_pengguna" (
    "id_pengguna" INTEGER NOT NULL,
    "saldo" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dompet_pengguna_pkey" PRIMARY KEY ("id_pengguna")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "id_pengguna" INTEGER NOT NULL,
    "id_laporan" INTEGER,
    "jenis_transaksi" VARCHAR(20) NOT NULL,
    "nominal" DECIMAL(12,2) NOT NULL,
    "tanggal" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keterangan" TEXT,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");

-- AddForeignKey
ALTER TABLE "laporan_jenis" ADD CONSTRAINT "laporan_jenis_id_jenis_fkey" FOREIGN KEY ("id_jenis") REFERENCES "jenis_sampah"("id_jenis") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "laporan_jenis" ADD CONSTRAINT "laporan_jenis_id_laporan_fkey" FOREIGN KEY ("id_laporan") REFERENCES "laporan_sampah"("id_laporan") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "laporan_sampah" ADD CONSTRAINT "laporan_sampah_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profil_pengguna" ADD CONSTRAINT "profil_pengguna_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dompet_pengguna" ADD CONSTRAINT "dompet_pengguna_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_laporan_fkey" FOREIGN KEY ("id_laporan") REFERENCES "laporan_sampah"("id_laporan") ON DELETE SET NULL ON UPDATE CASCADE;
