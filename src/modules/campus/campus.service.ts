import campusRepository from "./campus.repository";

const getCampusById = async (kampus_id: string) => {
    const campus = await campusRepository.getCampusById(kampus_id)

    if (!campus) throw new Error("Campus not found")

    return campus;
}


const getAllCampus = async () => {
    const campusList = await campusRepository.getAllCampus()

    if(!campusList) throw new Error("Campus not found")

    return campusList;
}


export default {
  getAllCampus,
  getCampusById,
};