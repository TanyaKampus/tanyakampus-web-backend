const prisma = require("../config/prisma.ts").default;
const {
  TipePertanyaan,
  TipeJawaban,
  TieTieBreakerType,
} = require("@prisma/client");

const seedQuiz = async () => {
  console.log("Starting quiz seeder...");

  try {
    // 1. SEED BIDANG
    console.log("Seeding Bidang...");
    const bidangData = [
      {
        nama_bidang: "Teknik dan Ilmu Komputer",
        deskripsi:
          "Bidang yang fokus pada teknologi, pemrograman, dan sistem informasi",
      },
      {
        nama_bidang: "Bisnis dan Ekonomi",
        deskripsi:
          "Bidang yang fokus pada manajemen, kewirausahaan, dan analisis ekonomi",
      },
      {
        nama_bidang: "Ilmu Sosial dan Politik",
        deskripsi:
          "Bidang yang fokus pada interaksi sosial, kebijakan publik, dan hukum",
      },
      {
        nama_bidang: "Desain dan Seni",
        deskripsi:
          "Bidang yang fokus pada kreativitas, estetika, dan ekspresi visual",
      },
    ];

    const bidangMap = new Map<string, string>();
    for (const bidang of bidangData) {
      const created = await prisma.bidang.upsert({
        where: { nama_bidang: bidang.nama_bidang },
        update: {},
        create: bidang,
      });
      bidangMap.set(bidang.nama_bidang, created.bidang_id);
      console.log(`   ✓ ${bidang.nama_bidang}`);
    }

    // 2. SEED JURUSAN
    console.log("Seeding Jurusan...");
    const jurusanData = [
      // Teknik dan Ilmu Komputer
      {
        nama: "Teknik Geologi",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari struktur bumi dan pemanfaatan sumber daya alam",
      },
      {
        nama: "Teknik Informatika",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari pengembangan software dan sistem komputer",
      },
      {
        nama: "Sistem Informasi",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari pengelolaan data dan sistem informasi bisnis",
      },
      {
        nama: "Teknik Industri",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi:
          "Mempelajari optimasi sistem produksi dan manajemen operasional",
      },
      {
        nama: "Teknik Sipil",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari perencanaan dan pembangunan infrastruktur",
      },
      {
        nama: "Teknik Elektro",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari sistem kelistrikan dan elektronika",
      },
      {
        nama: "Teknik Lingkungan",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari pengelolaan lingkungan dan keberlanjutan",
      },
      {
        nama: "Teknik Kimia",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari proses kimia dalam industri",
      },
      {
        nama: "Cyber Security",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari keamanan sistem dan jaringan komputer",
      },
      {
        nama: "Data Science",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari analisis data dan machine learning",
      },
      {
        nama: "Teknik Komputer",
        bidang: "Teknik dan Ilmu Komputer",
        deskripsi: "Mempelajari hardware dan arsitektur komputer",
      },

      // Bisnis dan Ekonomi
      {
        nama: "Manajemen",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari pengelolaan organisasi dan bisnis",
      },
      {
        nama: "Akuntansi",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari pencatatan dan pelaporan keuangan",
      },
      {
        nama: "Ilmu Ekonomi",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari teori ekonomi dan kebijakan fiskal",
      },
      {
        nama: "Ekonomi Pembangunan",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari strategi pembangunan ekonomi",
      },
      {
        nama: "Bisnis Digital",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari bisnis berbasis teknologi digital",
      },
      {
        nama: "Kewirausahaan",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari pembuatan dan pengembangan usaha",
      },
      {
        nama: "International Business",
        bidang: "Bisnis dan Ekonomi",
        deskripsi: "Mempelajari bisnis dalam konteks global",
      },

      // Ilmu Sosial dan Politik
      {
        nama: "Hubungan Internasional",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari diplomasi dan hubungan antar negara",
      },
      {
        nama: "Ilmu Hukum",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari sistem hukum dan perundang-undangan",
      },
      {
        nama: "Administrasi Bisnis",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari administrasi dalam organisasi bisnis",
      },
      {
        nama: "Administrasi Publik",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari manajemen sektor publik dan pemerintahan",
      },
      {
        nama: "Ilmu Komunikasi",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari komunikasi massa dan media",
      },
      {
        nama: "Kesejahteraan Sosial",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari pemberdayaan masyarakat",
      },
      {
        nama: "Hubungan Masyarakat",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari manajemen komunikasi organisasi",
      },
      {
        nama: "Komunikasi Pemasaran",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari strategi komunikasi dalam pemasaran",
      },
      {
        nama: "Administrasi Negara",
        bidang: "Ilmu Sosial dan Politik",
        deskripsi: "Mempelajari administrasi pemerintahan negara",
      },

      // Desain dan Seni
      {
        nama: "Desain Komunikasi Visual",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari desain grafis dan komunikasi visual",
      },
      {
        nama: "Desain Interior",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari perancangan ruang interior",
      },
      {
        nama: "Seni Rupa",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari seni lukis dan patung",
      },
      {
        nama: "Sastra Inggris",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari sastra dan bahasa Inggris",
      },
      {
        nama: "Film",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari produksi dan sinematografi",
      },
      {
        nama: "Animasi",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari pembuatan animasi digital",
      },
      {
        nama: "Desain Produk",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari perancangan produk industri",
      },
      {
        nama: "Seni Musik",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari teori dan praktik musik",
      },
      {
        nama: "Seni Tari",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari koreografi dan pertunjukan tari",
      },
      {
        nama: "Seni Rupa Murni",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari seni rupa murni",
      },
      {
        nama: "Seni Teater",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari seni pertunjukan teater",
      },
      {
        nama: "Tata Rias dan Busana",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari tata rias dan desain busana",
      },
      {
        nama: "Arsitektur",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari perancangan bangunan",
      },
      {
        nama: "Kriya",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari seni kriya dan kerajinan",
      },
      {
        nama: "Creative Media",
        bidang: "Desain dan Seni",
        deskripsi: "Mempelajari media kreatif digital",
      },
    ];

    const jurusanMap = new Map<string, string>();
    for (const jurusan of jurusanData) {
      const created = await prisma.jurusan.upsert({
        where: { nama_jurusan: jurusan.nama },
        update: {},
        create: {
          nama_jurusan: jurusan.nama,
          deskripsi: jurusan.deskripsi,
          bidang_id: bidangMap.get(jurusan.bidang),
        },
      });
      jurusanMap.set(jurusan.nama, created.jurusan_id);
      console.log(`   ✓ ${jurusan.nama}`);
    }

    // 3. SEED KAMPUS
    console.log("Seeding Kampus...");
    const kampusData = [
      {
        nama: "Universitas Padjadjaran",
        jenis: "Negeri",
        deskripsi:
          "Universitas negeri terkemuka di Bandung dengan 16 fakultas dan reputasi akademik tinggi",
        jurusan: [
          "Teknik Geologi",
          "Manajemen",
          "Bisnis Digital",
          "Ilmu Ekonomi",
          "Hubungan Internasional",
          "Administrasi Bisnis",
          "Kesejahteraan Sosial",
          "Ilmu Hukum",
          "Sastra Inggris",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188367/unpad_c0v7up.jpg",

        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Universitas+Padjadjaran&output=embed",
      },
      {
        nama: "Universitas Pasundan",
        jenis: "Swasta",
        deskripsi:
          "Universitas swasta di Bandung yang unggul dalam bidang sosial, ekonomi, hukum, dan teknik",
        jurusan: [
          "Teknik Industri",
          "Teknik Lingkungan",
          "Teknik Informatika",
          "Manajemen",
          "Akuntansi",
          "Ekonomi Pembangunan",
          "Administrasi Negara",
          "Hubungan Internasional",
          "Ilmu Hukum",
          "Desain Komunikasi Visual",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188812/unpas_dgjnca.jpg",

        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Universitas+Pasundan&output=embed",
      },
      {
        nama: "Universitas Katolik Parahyangan",
        jenis: "Swasta",
        deskripsi:
          "Universitas swasta tertua di Bandung dengan tradisi akademik kuat sejak 1955",
        jurusan: [
          "Teknik Sipil",
          "Teknik Industri",
          "Teknik Elektro",
          "Teknik Kimia",
          "Ekonomi Pembangunan",
          "Manajemen",
          "Akuntansi",
          "Administrasi Publik",
          "Hubungan Internasional",
          "Ilmu Hukum",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188868/unpar_boaibd.jpg",

        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Universitas+Katolik+Parahyangan&output=embed",
      },
      {
        nama: "Telkom University",
        jenis: "Swasta",
        deskripsi:
          "Universitas swasta berbasis teknologi, bisnis, dan kreatif yang fokus pada inovasi digital",
        jurusan: [
          "Sistem Informasi",
          "Teknik Informatika",
          "Teknik Industri",
          "Teknik Elektro",
          "Akuntansi",
          "Bisnis Digital",
          "Manajemen",
          "Ilmu Komunikasi",
          "Hubungan Masyarakat",
          "Desain Komunikasi Visual",
          "Desain Interior",
          "Film",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188794/telkom_udbnxt.jpg",

        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Telkom+University&output=embed",
      },
      {
        nama: "Bina Nusantara University",
        jenis: "Swasta",
        deskripsi:
          "Universitas swasta fokus teknologi dan bisnis dengan jaringan global sejak 1981",
        jurusan: [
          "Teknik Informatika",
          "Sistem Informasi",
          "Cyber Security",
          "Data Science",
          "Akuntansi",
          "Manajemen",
          "International Business",
          "Komunikasi Pemasaran",
          "Hubungan Internasional",
          "Desain Komunikasi Visual",
          "Animasi",
          "Desain Interior",
          "Creative Media",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188698/binus_rvzohz.jpg",

        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Bina+Nusantara+University&output=embed",
      },
      {
        nama: "Institut Teknologi Bandung",
        jenis: "Negeri",
        deskripsi:
          "Perguruan tinggi negeri pertama di Indonesia yang fokus pada sains, teknologi, dan seni",
        jurusan: [
          "Teknik Informatika",
          "Teknik Elektro",
          "Teknik Industri",
          "Teknik Lingkungan",
          "Teknik Sipil",
          "Manajemen",
          "Kewirausahaan",
          "Seni Rupa",
          "Desain Produk",
          "Desain Interior",
          "Kriya",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188603/itb_hj4lad.jpg",

        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Institut+Teknologi+Bandung&output=embed",
      },
      {
        nama: "Universitas Komputer Indonesia",
        jenis: "Swasta",
        deskripsi:
          "Universitas swasta di Bandung yang fokus pada teknologi informasi dan bisnis digital",
        jurusan: [
          "Teknik Informatika",
          "Sistem Informasi",
          "Teknik Komputer",
          "Teknik Elektro",
          "Manajemen",
          "Akuntansi",
          "Bisnis Digital",
          "Ilmu Komunikasi",
          "Hubungan Internasional",
          "Desain Komunikasi Visual",
          "Desain Interior",
          "Arsitektur",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188167/unikom_bacsec.jpg",

        akreditasi: "Unggul",
        alamat_kampus:
          "https://www.google.com/maps?q=Universitas+Komputer+Indonesia&output=embed",
      },
      {
        nama: "Institut Seni Budaya Indonesia",
        jenis: "Negeri",
        deskripsi:
          "Perguruan tinggi negeri fokus pengembangan seni pertunjukan, seni rupa, dan budaya nusantara",
        jurusan: [
          "Seni Tari",
          "Seni Musik",
          "Seni Rupa Murni",
          "Seni Teater",
          "Tata Rias dan Busana",
        ],
        foto_kampus:
          "https://res.cloudinary.com/dejjal27w/image/upload/v1769188911/isbi_wxttaw.jpg",
        akreditasi: "A",
        alamat_kampus:
          "https://www.google.com/maps?q=Institut+Seni+Budaya+Indonesia&output=embed",
      },
    ];

    for (const kampus of kampusData) {
      const createdKampus = await prisma.kampus.upsert({
        where: { nama_kampus: kampus.nama },
        update: {
          jenis_kampus: kampus.jenis,
          deskripsi_kampus: kampus.deskripsi,
          foto_kampus: kampus.foto_kampus || null,
          akreditasi: kampus.akreditasi || "B",
          alamat_kampus: kampus.alamat_kampus,
        },
        create: {
          nama_kampus: kampus.nama,
          jenis_kampus: kampus.jenis,
          deskripsi_kampus: kampus.deskripsi,
          foto_kampus: kampus.foto_kampus || null,
          akreditasi: kampus.akreditasi || "B",
          alamat_kampus:
            kampus.alamat_kampus || "Jalan Tidak Diketahui No.123, Bandung",
        },
      });

      // Link kampus dengan jurusan
      for (const jurusanNama of kampus.jurusan) {
        const jurusanId = jurusanMap.get(jurusanNama);
        if (jurusanId) {
          await prisma.jurusanKampus.upsert({
            where: {
              kampus_id_jurusan_id: {
                kampus_id: createdKampus.kampus_id,
                jurusan_id: jurusanId,
              },
            },
            update: {},
            create: {
              kampus_id: createdKampus.kampus_id,
              jurusan_id: jurusanId,
            },
          });
        }
      }
      console.log(`${kampus.nama} (${kampus.jurusan.length} jurusan)`);
    }

    // 4. SEED QUIZ
    console.log("Seeding Quiz...");
    const quiz = await prisma.quiz.upsert({
      where: { nama_quiz: "Quiz Penjurusan Kampus" },
      update: {},
      create: {
        nama_quiz: "Quiz Penjurusan Kampus",
        deskripsi_quiz:
          "Quiz untuk menentukan bidang studi yang sesuai dengan minat dan bakat Anda",
        is_active: true,
      },
    });
    console.log(`Quiz: ${quiz.nama_quiz}`);

    // 5. SEED PERTANYAAN BIDANG (12 pertanyaan)
    console.log("Seeding Pertanyaan Bidang...");
    const pertanyaanBidang = [
      // Teknik dan Ilmu Komputer (3 soal)
      {
        soal: "Kamu lebih tertarik untuk benar-benar mengutak-atik hardware atau coding untuk menciptakan solusi teknologi, daripada hanya membaca teorinya?",
        bidang: "Teknik dan Ilmu Komputer",
        urutan: 1,
      },
      {
        soal: "Kalau ada masalah error di sistem, kamu ingin langsung jadi orang yang turun tangan membetulkan kode atau arsitektur jaringan secara teknis?",
        bidang: "Teknik dan Ilmu Komputer",
        urutan: 2,
      },
      {
        soal: "Kamu selalu merasa senang jika bekerja untuk menyelesaikan proyek-proyek teknikal?",
        bidang: "Teknik dan Ilmu Komputer",
        urutan: 3,
      },
      // Bisnis dan Ekonomi (3 soal)
      {
        soal: "Kamu lebih suka jadi orang yang langsung mengambil keputusan berisiko tinggi daripada hanya membuat laporan analisisnya saja?",
        bidang: "Bisnis dan Ekonomi",
        urutan: 4,
      },
      {
        soal: "Kamu tertarik untuk secara langsung memimpin tim penjualan atau negosiasi di lapangan untuk mencapai target bisnis?",
        bidang: "Bisnis dan Ekonomi",
        urutan: 5,
      },
      {
        soal: "Kamu merasa tertantang untuk terjun langsung membuat dan menjual produk/jasa yang nyata di pasar, dan langsung melihat hasilnya?",
        bidang: "Bisnis dan Ekonomi",
        urutan: 6,
      },
      // Ilmu Sosial dan Politik (3 soal)
      {
        soal: "Kamu lebih tertarik untuk terjun langsung ke lapangan, bertemu warga, dan mengorganisir aksi sosial?",
        bidang: "Ilmu Sosial dan Politik",
        urutan: 7,
      },
      {
        soal: "Kamu bersedia menjadi penengah atau mediator langsung dalam konflik antar individu atau kelompok?",
        bidang: "Ilmu Sosial dan Politik",
        urutan: 8,
      },
      {
        soal: "Kamu punya minat yang kuat untuk secara langsung mengajar atau melatih?",
        bidang: "Ilmu Sosial dan Politik",
        urutan: 9,
      },
      // Desain dan Seni (3 soal)
      {
        soal: "Kamu merasa tertarik untuk mengekspresikan ide kreatif melalui gambar atau seni visual?",
        bidang: "Desain dan Seni",
        urutan: 10,
      },
      {
        soal: "Kamu memiliki ketertarikan pada elemen warna, bentuk, dan estetika dalam desain?",
        bidang: "Desain dan Seni",
        urutan: 11,
      },
      {
        soal: "Kamu merasa terinspirasi oleh seni, musik, atau ekspresi kreatif lainnya?",
        bidang: "Desain dan Seni",
        urutan: 12,
      },
    ];

    for (const p of pertanyaanBidang) {
      const pertanyaan = await prisma.pertanyaan.create({
        data: {
          quiz_id: quiz.quiz_id,
          soal: p.soal,
          tipe: TipePertanyaan.BIDANG,
          urutan: p.urutan,
          bidang_id: bidangMap.get(p.bidang),
        },
      });

      // Buat jawaban YA
      const jawabanYa = await prisma.jawaban.create({
        data: {
          pertanyaan_id: pertanyaan.pertanyaan_id,
          tipe_jawaban: TipeJawaban.YA,
          nilai: 1,
        },
      });

      // Link jawaban YA ke bidang dengan bobot 1
      await prisma.jawabanBidang.create({
        data: {
          jawaban_id: jawabanYa.jawaban_id,
          bidang_id: bidangMap.get(p.bidang)!,
          bobot: 1,
          is_tiebreaker: false,
        },
      });

      // Buat jawaban TIDAK
      await prisma.jawaban.create({
        data: {
          pertanyaan_id: pertanyaan.pertanyaan_id,
          tipe_jawaban: TipeJawaban.TIDAK,
          nilai: 0,
        },
      });

      console.log(`Soal ${p.urutan}: ${p.soal.substring(0, 50)}...`);
    }

    // 6. SEED PERTANYAAN TIEBREAKER (3 pertanyaan)
    console.log("Seeding Pertanyaan Tiebreaker...");
    const pertanyaanTiebreaker = [
      {
        soal: "Kamu merasa lebih berenergi ketika banyak berinteraksi dan ngobrol langsung dengan orang lain dibanding ketika sendirian?",
        urutan: 13,
        tipe_tiebreaker: TieTieBreakerType.EKSTROVERT_INTROVERT,
        mapping: {
          YA: ["Bisnis dan Ekonomi", "Ilmu Sosial dan Politik"],
          TIDAK: ["Teknik dan Ilmu Komputer", "Desain dan Seni"],
        },
      },
      {
        soal: "Saat mengambil keputusan penting, kamu lebih mengandalkan data, fakta, dan analisis daripada firasat atau perasaan?",
        urutan: 14,
        tipe_tiebreaker: TieTieBreakerType.LOGIS_INTUISI,
        mapping: {
          YA: ["Teknik dan Ilmu Komputer", "Bisnis dan Ekonomi"],
          TIDAK: ["Ilmu Sosial dan Politik", "Desain dan Seni"],
        },
      },
      {
        soal: "Kamu lebih nyaman jika punya rencana kerja yang jelas dan langkah-langkah tertulis, daripada bekerja mengalir dan improvisasi di tempat?",
        urutan: 15,
        tipe_tiebreaker: TieTieBreakerType.TERSTRUKTUR_BEBAS,
        mapping: {
          YA: ["Teknik dan Ilmu Komputer"],
          TIDAK: [
            "Ilmu Sosial dan Politik",
            "Bisnis dan Ekonomi",
            "Desain dan Seni",
          ],
        },
      },
    ];

    for (const p of pertanyaanTiebreaker) {
      const pertanyaan = await prisma.pertanyaan.create({
        data: {
          quiz_id: quiz.quiz_id,
          soal: p.soal,
          tipe: TipePertanyaan.TIE_BREAKER,
          urutan: p.urutan,
          tiebreaker_type: p.tipe_tiebreaker,
        },
      });

      // Buat jawaban YA dengan mapping ke bidang
      const jawabanYa = await prisma.jawaban.create({
        data: {
          pertanyaan_id: pertanyaan.pertanyaan_id,
          tipe_jawaban: TipeJawaban.YA,
          nilai: 1,
        },
      });

      // Link jawaban YA ke bidang-bidang terkait
      for (const bidangNama of p.mapping["YA"]) {
        await prisma.jawabanBidang.create({
          data: {
            jawaban_id: jawabanYa.jawaban_id,
            bidang_id: bidangMap.get(bidangNama)!,
            bobot: 1,
            is_tiebreaker: true,
          },
        });
      }

      // Buat jawaban TIDAK dengan mapping ke bidang
      const jawabanTidak = await prisma.jawaban.create({
        data: {
          pertanyaan_id: pertanyaan.pertanyaan_id,
          tipe_jawaban: TipeJawaban.TIDAK,
          nilai: 1,
        },
      });

      // Link jawaban TIDAK ke bidang-bidang terkait
      for (const bidangNama of p.mapping["TIDAK"]) {
        await prisma.jawabanBidang.create({
          data: {
            jawaban_id: jawabanTidak.jawaban_id,
            bidang_id: bidangMap.get(bidangNama)!,
            bobot: 1,
            is_tiebreaker: true,
          },
        });
      }

      console.log(`Tiebreaker ${p.urutan - 12}: ${p.soal.substring(0, 50)}...`);
    }

    console.log("\n Seeding completed successfully!");
    console.log(`\n Summary:`);
    console.log(`   • ${bidangData.length} Bidang`);
    console.log(`   • ${jurusanData.length} Jurusan`);
    console.log(`   • ${kampusData.length} Kampus`);
    console.log(`   • 1 Quiz`);
    console.log(`   • ${pertanyaanBidang.length} Pertanyaan Bidang`);
    console.log(`   • ${pertanyaanTiebreaker.length} Pertanyaan Tiebreaker`);
  } catch (error) {
    console.error("Error seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Run seeder
seedQuiz().catch((error) => {
  console.error(error);
  process.exit(1);
});
