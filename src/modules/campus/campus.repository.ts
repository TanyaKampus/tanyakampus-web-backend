import prisma from "../../config/prisma";

const getCampusById = async (kampus_id: string) => {
  const campus = await prisma.kampus.findUnique({
    where: { kampus_id },
    include: {
      jurusanKampus: { include: { jurusan: true } },
    },
  });

  if (!campus) return null;

  return {
    ...campus,
    jurusan: campus.jurusanKampus.map((jk) => ({
      jurusan_id: jk.jurusan.jurusan_id,
      nama_jurusan: jk.jurusan.nama_jurusan,
      deskripsi: jk.jurusan.deskripsi,
    })),
  };
};

const getAllCampus = async () => {
  return prisma.kampus.findMany({
    select: {
      kampus_id: true,
      nama_kampus: true,
      jenis_kampus: true,
      deskripsi_kampus: true,
      foto_kampus: true,
    },
  });
};

const getJurusanById = async (jurusan_id: string) => {
  const jurusan = await prisma.jurusan.findUnique({
    where: { jurusan_id },
    include: { jurusanKampus: { include: { kampus: true } } },
  });

  if (!jurusan) return null;

  return {
    jurusan_id: jurusan.jurusan_id,
    nama_jurusan: jurusan.nama_jurusan,
    deskripsi: jurusan.deskripsi,
    kampus: jurusan.jurusanKampus.map((jk) => ({
      kampus_id: jk.kampus.kampus_id,
      nama_kampus: jk.kampus.nama_kampus,
      jenis_kampus: jk.kampus.jenis_kampus,
      deskripsi_kampus: jk.kampus.deskripsi_kampus,
    })),
  };
};

const getAllJurusan = async () => {
  const jurusans = await prisma.jurusan.findMany({
    include: { jurusanKampus: { include: { kampus: true } } },
  });

  return jurusans.map((jurusan) => ({
    jurusan_id: jurusan.jurusan_id,
    nama_jurusan: jurusan.nama_jurusan,
    deskripsi: jurusan.deskripsi,
    kampus: jurusan.jurusanKampus.map((jk) => ({
      kampus_id: jk.kampus.kampus_id,
      nama_kampus: jk.kampus.nama_kampus,
      jenis_kampus: jk.kampus.jenis_kampus,
      deskripsi_kampus: jk.kampus.deskripsi_kampus,
    })),
  }));
};

export default {
  getAllCampus,
  getAllJurusan,
  getCampusById,
  getJurusanById,
};
