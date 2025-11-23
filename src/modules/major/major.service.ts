import majorRepository from "./major.repository"

const createMajor = async (data: {
    jurusan_id: string,
    nama_jurusan: string,
    deskripsi: string,
}) => {
    const result = await majorRepository.createMajor(data)

    return result
}

const getAllMajor = async () => {
    const majorList = await majorRepository.getAllMajor()

    if(!majorList) throw new Error("Major not found")

    return majorList
}

const getMajorById = async (jurusan_id: string) => {

    const major = await majorRepository.getMajorById(jurusan_id)

    if(!major) throw new Error("Major not found")

    return major
}

const updateMajor = async (
    jurusan_id: string,
    data: {
        nama_jurusan: string,
        deskripsi: string,
}) => {
    const major = await majorRepository.updateMajor(jurusan_id, data)

    return major
}

const deleteMajor = async (jurusan_id: string) =>  { 
    const major = await majorRepository.deleteMajor(jurusan_id)

    if(!major) throw new Error("Major not found")

    return major
}

export default{
    createMajor,
    getAllMajor,
    getMajorById,
    updateMajor,
    deleteMajor,
}