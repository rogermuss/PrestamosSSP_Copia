import { z } from 'zod';

export const RequestSchema = z.object({
    requesterName: z.string()
        .min(1, 'Debes estar autenticado para realizar una solicitud')
        .email('Email inválido'),
    total: z.number()
        .min(1, 'No has seleccionado materiales'),
    request: z.array(z.object({
        id: z.number(),
        name: z.string(),
        stock: z.number(), 
        quantity: z.number(),
    }))
});

export const RequestIdSchema = z.object({
    requestId: z.string()
        .transform((value) => parseInt(value))
        .refine(value => value > 0, { message: 'ID de solicitud no válido' })
});

export const SearchSchema = z.object({
    search: z.string().trim().min(1, { message: 'La búsqueda no puede ir vacía' })
});

// 4. Schema para un MATERIAL
export const MaterialSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Material no puede ir vacío' }),
    
    description: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    
    categoryId: z.coerce.number().min(1, { message: 'La Categoría es Obligatoria' }),

    variants: z.array(
        z.object({
            id: z.number().optional(),
            specification: z.coerce.string().min(1, { message: 'La especificación no puede ir vacía' }),
            stock: z.coerce.number().min(0, { message: 'El stock no puede ser negativo' }),
            totalStock: z.coerce.number().min(0, { message: 'El stock total no puede ser negativo' })
        })
    ).min(1, { message: 'Debes agregar al menos una variante o especificación' })
});