import campusRepository from "./campus.repository";

const getAllCampus = async () => {
  const campusList = await campusRepository.getAllCampus();

  if (!campusList) throw new Error("Campus not found");

  return campusList;
};

const getCampusById = async (kampus_id: string) => {
  const campus = await campusRepository.getCampusById(kampus_id);
  if (!campus) return null;

  return campus;
};

const createCampus = async (data: {
  nama_kampus: string;
  jenis_kampus: string;
  deskripsi_kampus: string;
  foto_kampus?: string;
}) => {
  const result = await campusRepository.createCampus(data);

  return result;
};

const updateCampus = async (
  kampus_id: string,
  data: {
    nama_kampus: string;
    jenis_kampus: string;
    deskripsi_kampus: string;
    foto_kampus?: string;
  }
) => {
  if (!data) throw new Error("Data campus not found");

  const campus = await campusRepository.updateCampus(kampus_id, data);

  return campus;
};

const deleteCampus = async (kampus_id: string) => {
  const campus = await campusRepository.deleteCampus(kampus_id)

  return campus
}

export default {
  getAllCampus,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus,
};
