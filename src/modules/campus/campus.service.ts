import campusRepository from "./campus.repository";
import majorRepository from "../major/major.repository";

const getAllCampus = async (page: number, limit: number) => {
  return await campusRepository.getAllCampus(page, limit);
};

const getCampusById = async (kampus_id: string) => {
  const campus = await campusRepository.getCampusById(kampus_id);

  if (!campus) throw new Error("Campus not found");

  return campus;
};

const createCampus = async (data: {
  nama_kampus: string;
  jenis_kampus: string;
  deskripsi_kampus?: string;
  akreditasi?: string;
  maps_url: string;
  instagram: string;
  website: string;
  no_telepon: string;
  alamat_kampus?: string;
  foto_kampus?: string;
  jurusan_ids: string[];
}) => {
  if (!data.nama_kampus?.trim()) {
    throw new Error("Campus name is required");
  }

  if (!data.jenis_kampus?.trim()) {
    throw new Error("Campus type is required");
  }

  // Validasi jurusan jika ada
  if (data.jurusan_ids && data.jurusan_ids.length > 0) {
    const majorsExist = await majorRepository.findManyMajorsById(
      data.jurusan_ids,
    );

    if (majorsExist.length !== data.jurusan_ids.length) {
      throw new Error("Some majors not found");
    }
  }

  // Create campus + attach jurusan
  const result = await campusRepository.createCampus(data);

  return result;
};

const updateCampus = async (
  kampus_id: string,
  data: {
    nama_kampus: string;
    jenis_kampus: string;
    deskripsi_kampus: string;
    akreditasi?: string;
    alamat_kampus?: string;
    foto_kampus?: string;
  },
) => {
  if (!data) throw new Error("Data campus not found");

  const campus = await campusRepository.updateCampus(kampus_id, data);

  return campus;
};

const deleteCampus = async (kampus_id: string) => {
  const campus = await campusRepository.deleteCampus(kampus_id);

  return campus;
};

export default {
  getAllCampus,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus,
};
