import campusService from "./campus.service";
import { Request, Response } from "express";

const getAllCampus = async (req: Request, res: Response) => {

    try {
        const data = await campusService.getAllCampus();
           return res.json(data);
    } catch (error: any) {
        res.status(500).json({
            status: true,
            message: error.message
        })
    }
}

export default{ 
    getAllCampus
}