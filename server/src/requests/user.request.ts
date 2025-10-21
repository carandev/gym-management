import z from "zod";

export const createUserRequest = z.object({
    username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    email: z.email('El correo no es valido'),
    clerkId: z.string().min(2, 'El codigo de clerk no es valido, debe tener minimo 2')
})

export type CreateUserRequest = z.infer<typeof createUserRequest>

export const getUserByClerkIdRequest = z.object({
    id: z.string()
})

export type GetUserByClerkIdRequest = z.infer<typeof getUserByClerkIdRequest>

export const updateUserRequest = z.object({
    id: z.number().int().positive(),
    username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequest>