const prisma = require("../src/config/prisma.ts").default;

async function main() {
  console.log("⏳ Seeding started...\n");

  // ===============================
  // 1. SEED JURUSAN
  // ===============================
  const jurusanData = [
    { nama_jurusan: "Teknik Informatika" },
    { nama_jurusan: "Sistem Informasi" },
    { nama_jurusan: "Manajemen" },
    { nama_jurusan: "Akuntansi" },
    { nama_jurusan: "Teknik Elektro" },
    { nama_jurusan: "Desain Komunikasi Visual" },
  ];

  // createMany + skipDuplicates untuk efisiensi
  await prisma.jurusan.createMany({
    data: jurusanData,
    skipDuplicates: true,
  });

  const allJurusans = await prisma.jurusan.findMany();
  const jurusansMap = {};
  allJurusans.forEach((j) => {
    jurusansMap[j.nama_jurusan] = j;
  });

  console.log("✔️ Jurusan seeded:", allJurusans.length);

  // ===============================
  // 2. SEED KAMPUS
  // ===============================
  const kampusData = [
    {
      nama_kampus: "Institut Teknologi Bandung",
      jenis_kampus: "Universitas",
      deskripsi_kampus: "Perguruan tinggi teknik terbaik di Indonesia.",
      foto_kampus: "/img/itb.jpg",
      jurusan: ["Teknik Informatika", "Sistem Informasi", "Teknik Elektro"],
    },
    {
      nama_kampus: "Universitas Telkom",
      jenis_kampus: "Universitas",
      deskripsi_kampus: "Kampus swasta dengan teknologi modern.",
      foto_kampus: "/img/telkom.jpg",
      jurusan: ["Informatika", "Sistem Informasi", "Desain Komunikasi Visual"],
    },
    {
      nama_kampus: "Universitas Padjadjaran",
      jenis_kampus: "Universitas",
      deskripsi_kampus: "Universitas negeri unggulan di Bandung.",
      foto_kampus: "/img/unpad.jpg",
      jurusan: ["Manajemen", "Akuntansi", "Teknik Informatika"],
    },
  ];

  let insertedKampus = 0;

  for (const k of kampusData) {
    // 1️⃣ buat kampus
    const kampus = await prisma.kampus.create({
      data: {
        nama_kampus: k.nama_kampus,
        jenis_kampus: k.jenis_kampus,
        deskripsi_kampus: k.deskripsi_kampus,
        foto_kampus: k.foto_kampus || null,
      },
    });

    // 2️⃣ buat relasi ke jurusan
    for (const jurusanNama of k.jurusan) {
      const jurusanObj = jurusansMap[jurusanNama];
      if (jurusanObj) {
        await prisma.jurusanKampus.create({
          data: {
            kampus_id: kampus.kampus_id,
            jurusan_id: jurusanObj.jurusan_id,
          },
        });
      }
    }

    insertedKampus++;
  }

  console.log("✔️ Kampus seeded:", insertedKampus);
  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });