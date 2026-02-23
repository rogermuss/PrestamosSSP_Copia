// --- START OF FILE update-material-action.ts ---

"use server"
import { prisma } from "@/src/lib/prisma"
import { MaterialSchema } from "@/src/schema" // 1. Usa el nuevo MaterialSchema
import { revalidatePath } from "next/cache"

export async function updateMaterial(data: unknown, id: number) {
    const result = MaterialSchema.safeParse(data)
    
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    // 2. Actualiza en el modelo Material
    await prisma.material.update({
        where: {
            id
        },
        data: result.data
    })

    // 3. Revalida la ruta de materiales para refrescar la tabla del admin
    revalidatePath('/admin/materials')
}