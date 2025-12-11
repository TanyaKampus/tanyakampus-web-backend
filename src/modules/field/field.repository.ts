import { string } from "zod"
import prisma from "../../config/prisma"

const createField = (data:{
    bidang_id: string,
    nama_bidang: string,
    deskripsi: string
}) => {
    return prisma.bidang.create({
        data,
    })
}

const getAllFields = () => {
    return prisma.bidang.findMany()
}

const getFieldById = (bidang_id: string) => {
    return prisma.bidang.findUnique({
        where: {
            bidang_id
        }
    })
}

const updateField = (bidang_id: string, data: {
    nama_bidang: string,
    deskripsi: string,
}) => {
    return prisma.bidang.update({
        where: {
            bidang_id,
        },
        data
    })
}

const deleteField = (bidang_id: string) => {
    return prisma.bidang.delete({
        where: {
            bidang_id,
        },

    })
}


export default{ 
    createField,
    getAllFields,
    getFieldById,
    updateField,
    deleteField,
}