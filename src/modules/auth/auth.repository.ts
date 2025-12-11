import prisma from "../../config/prisma";

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createUser = async (data: any) => {
  return await prisma.user.create({
    data,
  });
};

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: {
      user_id,
    },
    include: {
      profile: true, 
    },
  });
};

const findProfileById = async (user_id: string) => {
  return await prisma.profile.findUnique({
    where: {
      user_id,
    },
  });
};

const updateProfile = async (
  user_id: string,
  data: { nama: string; jenis_kelamin: string; tanggal_lahir: Date }
) => {
  return await prisma.profile.update({
    where: {
      user_id,
    },
    data,
  });
};

export default {
  findUserByEmail,
  createUser,
  findUserById,
  findProfileById,
  updateProfile,
};
