// --- START OF FILE create-material-action.ts ---

"use server"
import { prisma } from "@/src/lib/prisma"
import { MaterialSchema } from "@/src/schema" // 1. Usa el nuevo MaterialSchema
import { revalidatePath } from 'next/cache'

export async function createMaterial(data: unknown) {
    const result = MaterialSchema.safeParse(data)
    
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    // 2. Crea en el modelo Material
    await prisma.material.create({
        data: result.data
    })

    // 3. Revalida la ruta de materiales para refrescar la tabla del admin
    revalidatePath('/admin/materials')
}