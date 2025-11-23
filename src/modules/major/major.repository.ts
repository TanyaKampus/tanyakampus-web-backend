import prisma from "../../config/prisma";

const createMajor = async (data: any) => {
  return await prisma.jurusan.create({
    data,
  });
};

const getAllMajor = async () => {
  return await prisma.jurusan.findMany();
}

const getMajorById = async (jurusan_id: string) => {
    return await prisma.jurusan.findUnique({
        where:{
            jurusan_id
        }
    })
}

const updateMajor = async (jurusan_id: string, data: any) => {
    return await prisma.jurusan.update({
        where: {
            jurusan_id,
        },
        data
    })
}

const deleteMajor = async (jurusan_id: string) => {
    return await prisma.jurusan.delete({
        where: {
            jurusan_id
        }
    })
}

export default {
  createMajor,
  getAllMajor,
  getMajorById,
  updateMajor,
  deleteMajor,
};
