// src/modules/mentor/mentor.repository.ts
import prisma from "../../config/prisma";

const createMentor = async (data: {
  nama_mentor: string;
  pendidikan: string;
  keahlian: string;
  logo_kampus: string;
  foto_mentor?: string | null;
}) => {
  return await prisma.mentor.create({
    data: {
      nama_mentor: data.nama_mentor,
      pendidikan: data.pendidikan,
      keahlian: data.keahlian,
      logo_kampus: data.logo_kampus,
      foto_mentor: data.foto_mentor ?? null,
    },
  });
};

const getAllMentor = async () => {
  return await prisma.mentor.findMany({
    select: {
      mentor_id: true,
      nama_mentor: true,
      pendidikan: true,
      logo_kampus: true,
      keahlian: true,
      foto_mentor: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMentorById = async (mentor_id: string) => {
  return await prisma.mentor.findUnique({
    where: { mentor_id },
    select: {
      mentor_id: true,
      nama_mentor: true,
      pendidikan: true,
      keahlian: true,
      logo_kampus: true,
      foto_mentor: true,
      createdAt: true,
      updatedAt: true,
    },
  });
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
  return await prisma.mentor.update({
    where: { mentor_id },
    data,
  });
};

const deleteMentor = async (mentor_id: string) => {
  return await prisma.mentor.delete({
    where: { mentor_id },
  });
};

const findManyMentorsById = async (mentor_ids: string[]) => {
  return await prisma.mentor.findMany({
    where: {
      mentor_id: {
        in: mentor_ids,
      },
    },
  });
};

export default {
  createMentor,
  getAllMentor,
  getMentorById,
  updateMentor,
  deleteMentor,
  findManyMentorsById,
};
