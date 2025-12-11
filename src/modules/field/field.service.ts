import fieldRepository from "./field.repository";

const createField = async (data: {
  bidang_id: string;
  nama_bidang: string;
  deskripsi: string;
}) => {
  const result = await fieldRepository.createField(data);

  return result;
};

const getAllFields = async () => {
  const field = await fieldRepository.getAllFields();

  if (!field) throw new Error("Field not found");

  return field;
};

const getFieldById = async (bidang_id: string) => {
  const field = await fieldRepository.getFieldById(bidang_id);

  if (!field) throw new Error("Field not found");

  return field;
};

const updateField = async (
  bidang_id: string,
  data: {
    nama_bidang: string;
    deskripsi: string;
  }
) => {
  const field = await fieldRepository.updateField(bidang_id, data);

  return field;
};

const deleteField = async (bidang_id: string) => {
    const field = await fieldRepository.deleteField(bidang_id)

    return field
}

export default {
  createField,
  getAllFields,
  getFieldById,
  updateField,
  deleteField,
};
