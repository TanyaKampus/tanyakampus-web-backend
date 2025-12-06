import { ZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const pretty = z.prettifyError(parsed.error);
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: pretty,
      });
    }
    req.body = parsed.data;
    next();
  };
