import { z } from "zod"

export const registerSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal diisi 6 karakter"),
  nama: z.string().min(1, "Nama minimal diisi 6 karakter"),
  no_telepon: z.string().regex(/^8[0-9]{8,11}$/, "Nomor telepon tidak valid"),
  asal_sekolah: z.string().min(1, "Asal sekolah wajib diisi"),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], {
    message: "Jenis kelamin harus Laki-laki atau Perempuan",
  }),
});

export const loginSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal diisi 6 karakter"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;