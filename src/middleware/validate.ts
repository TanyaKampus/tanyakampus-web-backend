import { z, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flattened = z.flattenError(result.error);

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: {
          fieldErrors: flattened.fieldErrors,
        },
      });
    }

    req.body = result.data;
    next();
  };
