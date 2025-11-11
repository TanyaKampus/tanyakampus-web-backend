import prisma from "../../config/prisma";

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findTempUserByEmail = async (email: string) => {
  return await prisma.tempUser.findUnique({
    where: {
      email
    }
  })
}

const createTempUser = async (email: string) => {
  return await prisma.tempUser.create({
    data: {
      email,
    },
  });
};

const deleteTempUser = async (email: string) => {
  return await prisma.tempUser.delete({
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
      profile: true, // ambil data profil juga
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
  findTempUserByEmail,
  createTempUser,
  deleteTempUser
};
