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
      deskripsi_kampus: true,
      foto_kampus: true,
    },
  });
};

const createCampus = async (data:any) => {
  return prisma.kampus.create({
    data,
  })
}

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
