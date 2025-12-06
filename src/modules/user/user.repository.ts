import prisma from "../../config/prisma";

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
    findProfileById,
    updateProfile,
}