import prisma from "../../config/prisma";

const getCampusById = async (kampus_id: string) => {
  const campus = await prisma.kampus.findUnique({
    where: { kampus_id },
    include: {
      jurusanKampus: {
        include: {
          jurusan: {
            select: {
              jurusan_id: true,
              nama_jurusan: true,
            },
          },
        },
      },
    },
  });

  if (!campus) return null;

  const { jurusanKampus, ...rest } = campus;

  return {
    ...rest,
    jurusan: jurusanKampus.map((jk) => jk.jurusan),
  };
};

const getAllCampus = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const campusList = await prisma.kampus.findMany({
    skip,
    take: limit,
    select: {
      kampus_id: true,
      nama_kampus: true,
      jenis_kampus: true,
      logo_kampus: true,
      akreditasi: true,
      alamat_kampus: true,
      maps_url: true,
      instagram: true,
      website: true,
      no_telepon: true,
      deskripsi_kampus: true,
      foto_kampus: true,
    },
  });
  const total = await prisma.kampus.count();
  return {
    data: campusList,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

const createCampus = async (data: {
  nama_kampus: string;
  jenis_kampus: string;
  logo_kampus: string;
  deskripsi_kampus?: string;
  akreditasi?: string;
  maps_url: string;
  instagram: string;
  website: string;
  no_telepon: string;
  alamat_kampus?: string;
  foto_kampus?: string;
  jurusan_ids?: string[];
}) => {
  const campusData: any = {
    nama_kampus: data.nama_kampus,
    jenis_kampus: data.jenis_kampus,
  };

  if (data.akreditasi !== undefined) {
    campusData.akreditasi = data.akreditasi;
  }

  if (data.alamat_kampus !== undefined) {
    campusData.alamat_kampus = data.alamat_kampus;
  }

  if (data.deskripsi_kampus !== undefined) {
    campusData.deskripsi_kampus = data.deskripsi_kampus;
  }

  if (data.foto_kampus !== undefined) {
    campusData.foto_kampus = data.foto_kampus;
  }

  if (data.jurusan_ids && data.jurusan_ids.length > 0) {
    campusData.jurusanKampus = {
      create: data.jurusan_ids.map((jurusan_id) => ({
        jurusan_id,
      })),
    };
  }

  const campus = await prisma.kampus.create({
    data: campusData,
    include: {
      jurusanKampus: {
        include: {
          jurusan: {
            select: {
              jurusan_id: true,
              nama_jurusan: true,
              deskripsi: true,
            },
          },
        },
      },
    },
  });

  const { jurusanKampus, ...rest } = campus;
  return {
    ...rest,
    jurusan: jurusanKampus.map((jk) => jk.jurusan),
  };
};

const updateCampus = async (kampus_id: string, data: any) => {
  return prisma.kampus.update({
    where: {
      kampus_id,
    },
    data,
  });
};

const deleteCampus = async (kampus_id: string) => {
  return prisma.kampus.delete({
    where: { kampus_id },
  });
};

export default {
  getAllCampus,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus,
};
