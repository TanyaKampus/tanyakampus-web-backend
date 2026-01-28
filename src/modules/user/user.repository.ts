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
  data: Partial<{
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: Date;
    foto_profil: string;
    no_telepon: string;
    asal_sekolah: string;
  }>,
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
};
