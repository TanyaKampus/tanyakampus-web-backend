import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  nama: z.string().min(1, "Name is required"),
  no_telepon: z.string().regex(/^8[0-9]{8,11}$/, "Invalid phone number"),
  asal_sekolah: z.string().min(1, "School name is required"),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], {
    message: "Gender must be either Laki-laki or Perempuan",
  }),
});

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
