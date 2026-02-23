// src/schema/index.ts

import { z } from 'zod';

// 1. Schema para una SOLICITUD (reemplaza a OrderSchema)
export const RequestSchema = z.object({
    // Valida el email del solicitante (ahora se usa el email en lugar del nombre)
    requesterName: z.string()
        .min(1, 'Debes estar autenticado para realizar una solicitud')
        .email('Email inválido'),
    
    // Valida el total de ítems en la solicitud
    total: z.number()
        .min(1, 'No has seleccionado materiales'),
    
    // Valida la lista de materiales en la solicitud
    request: z.array(z.object({
        id: z.number(),
        name: z.string(),
        stock: z.number(), // El item de la solicitud ahora tiene 'stock'
        quantity: z.number(),
    }))
});

// 2. Schema para validar el ID de una SOLICITUD (reemplaza a OrderIdSchema)
export const RequestIdSchema = z.object({
    requestId: z.string() // El ID viene como string del formulario
        .transform((value) => parseInt(value)) // Lo convertimos a número
        .refine(value => value > 0, { message: 'ID de solicitud no válido' })
});

// 3. Schema de BÚSQUEDA (sin cambios, sigue siendo útil)
export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, { message: 'La búsqueda no puede ir vacía' })
});

// 4. Schema para un MATERIAL (reemplaza a ProductSchema)
export const MaterialSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Material no puede ir vacío' }),
    
    // La imagen ya no es necesaria ya que usaremos el ícono de la categoría
    image: z.string().optional(),
    
    // Valida el stock actual (variable)
    stock: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value >= 0, { message: 'El stock actual no puede ser negativo' })
        .or(z.number().min(0, { message: 'El stock actual no puede ser negativo' })),
    
    // Valida el stock total (fijo)
    totalStock: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value >= 0, { message: 'El stock total no puede ser negativo' })
        .or(z.number().min(0, { message: 'El stock total no puede ser negativo' })),
    
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, { message: 'La Categoría es Obligatoria' }))
});