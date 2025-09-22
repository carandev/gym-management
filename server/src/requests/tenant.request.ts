import z from "zod";

export const createTenantRequest = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.')
})

export const getTenantByIdRequest = z.object({
  id: z.number().int().positive('El valor debe ser mayor o igual a cero.')
})

export const updateTenantRequest = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
});

export const deleteTenantRequest = z.object({
  id: z.number().int().positive('El valor debe ser mayor o igual a cero.'),
});
