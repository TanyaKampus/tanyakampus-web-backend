// src/modules/mentor/mentor.service.ts
import mentorRepository from "./mentor.repository";

const createMentor = async (data: {
  nama_mentor: string;
  pendidikan: string;
  logo_kampus: string;
  keahlian: string;
  foto_mentor?: string;
}) => {
  const result = await mentorRepository.createMentor(data);
  return result;
};

const getAllMentor = async () => {
  const mentorList = await mentorRepository.getAllMentor();

  if (!mentorList) {
    throw new Error("Mentor not found");
  }

  return mentorList;
};

const getMentorById = async (mentor_id: string) => {
  const mentor = await mentorRepository.getMentorById(mentor_id);

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  return mentor;
};

const updateMentor = async (
  mentor_id: string,
  data: {
    nama_mentor?: string;
    pendidikan?: string;
    keahlian?: string;
    foto_mentor?: string;
  }
) => {
  // Check if mentor exists
  const mentor = await mentorRepository.getMentorById(mentor_id);
  if (!mentor) {
    throw new Error("Mentor not found");
  }

  const updatedMentor = await mentorRepository.updateMentor(mentor_id, data);
  return updatedMentor;
};

const deleteMentor = async (mentor_id: string) => {
  // Check if mentor exists
  const mentor = await mentorRepository.getMentorById(mentor_id);
  if (!mentor) {
    throw new Error("Mentor not found");
  }

  const result = await mentorRepository.deleteMentor(mentor_id);
  return result;
};

export default {
  createMentor,
  getAllMentor,
  getMentorById,
  updateMentor,
  deleteMentor,
};
