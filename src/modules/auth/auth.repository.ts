const prisma = require("../../config/prisma");

const findUserByEmail = async (email: String) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createUser = async (data: any) => {
  return await prisma.user.create({ data });
};



module.exports = {
    findUserByEmail,
    createUser,
}
