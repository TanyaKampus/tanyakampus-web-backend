import prisma from "../../config/prisma"

 const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createUser = async (data: any) => {
  return await prisma.user.create({ data });
};

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where:{
      user_id,
    }
  })
}






export default {
  findUserByEmail,
  createUser,
  findUserById
}
