import authRepository from "../auth/auth.repository";

const getProfile = async (user_id: string) => {
  const user = await authRepository.findUserById(user_id);

  if (!user) throw new Error("User not found");

  const { password, ...safeUser } = user;
  return safeUser;
};

const updateProfile = async (
  user_id: string,
  data: {
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: Date;
    foto_profil: string;
    no_telepon: string;
    asal_sekolah: string;
  }
) => {
  const existingProfile = await authRepository.findProfileById(user_id);

  if (!existingProfile) throw new Error("Profile not found");

  const updatedProfile = await authRepository.updateProfile(user_id, data);

  return updatedProfile
};

export default {
    getProfile,
    updateProfile
}