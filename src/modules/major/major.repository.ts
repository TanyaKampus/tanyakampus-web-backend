import prisma from "../../config/prisma";

const createMajor = async (data: {
  nama_jurusan: string;
  deskripsi: string;
  bidang_id: string;
}) => {
  return prisma.jurusan.create({
    data: {
      nama_jurusan: data.nama_jurusan,
      deskripsi: data.deskripsi,
      bidang: {
        connect: { bidang_id: data.bidang_id },
      },
    },
    include: {
      bidang: true,
    },
  });
};

const getAllMajor = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const majors = await prisma.jurusan.findMany({
    skip,
    take: limit,
    select: {
      jurusan_id: true,
      nama_jurusan: true,
      deskripsi: true,
      icon: true,
      bidang: { select: { bidang_id: true, nama_bidang: true } },
    },
  });
  const total = await prisma.jurusan.count();
  return {
    data: majors,
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

const getMajorById = async (jurusan_id: string) => {
  return prisma.jurusan.findUnique({
    where: { jurusan_id },
    select: {
      jurusan_id: true,
      nama_jurusan: true,
      deskripsi: true,
      icon: true,
      createdAt: true,
      updatedAt: true,
      bidang: {
        select: {
          bidang_id: true,
          nama_bidang: true,
          deskripsi: true,
        },
      },
    },
  });
};

const updateMajor = async (jurusan_id: string, data: any) => {
  return await prisma.jurusan.update({
    where: {
      jurusan_id,
    },
    data,
  });
};

const deleteMajor = async (jurusan_id: string) => {
  return await prisma.jurusan.delete({
    where: {
      jurusan_id,
    },
  });
};

const findManyMajorsById = async (jurusan_ids: string[]) => {
  return await prisma.jurusan.findMany({
    where: {
      jurusan_id: {
        in: jurusan_ids,
      },
    },
  });
};

export default {
  createMajor,
  getAllMajor,
  getMajorById,
  updateMajor,
  deleteMajor,
  findManyMajorsById,
};
