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




const getAllCampus = async () => {
  return prisma.kampus.findMany({
    select: {
      kampus_id: true,
      nama_kampus: true,
      jenis_kampus: true,
      akreditasi: true,
      alamat_kampus: true,
      deskripsi_kampus: true,
      foto_kampus: true,
    },
  });
};

const createCampus = async (data: {
  nama_kampus: string;
  jenis_kampus: string;
  deskripsi_kampus?: string;
  akreditasi?: string;
  alamat_kampus?: string;
  foto_kampus?: string;
  jurusan_ids?: string[];
}) => {
  const campusData: any = {
    nama_kampus: data.nama_kampus,
    jenis_kampus: data.jenis_kampus,
  };

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

  // Transform response
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
    data
  })
}

const deleteCampus = async(kampus_id: string) => {
  return prisma.kampus.delete({
    where: {kampus_id}
  })
}


export default {
  getAllCampus,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus,
};
