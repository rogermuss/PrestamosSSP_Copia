"use server"
import { prisma } from "@/src/lib/prisma"
import { MaterialSchema } from "@/src/schema" 
import { revalidatePath } from "next/cache"

export async function updateMaterial(data: unknown, id: number) {
    const result = MaterialSchema.safeParse(data)
    
    if (!result.success) {
        return { errors: result.error.issues }
    }

    try {
        // 1. Actualizamos la info de la "Carpeta" del material
        await prisma.material.update({
            where: { id },
            data: {
                name: result.data.name,
                description: result.data.description,
                image: result.data.image || '',
                categoryId: result.data.categoryId,
            }
        })

        // 2. Extraemos los IDs de las variantes que decidimos conservar
        const variantIdsToKeep = result.data.variants
            .map(v => v.id)
            .filter((vId): vId is number => vId !== undefined)

        // 3. Borramos las que el admin haya quitado con la 'X' roja
        if (variantIdsToKeep.length > 0) {
            try {
                await prisma.materialvariant.deleteMany({
                    where: {
                        materialId: id,
                        id: { notIn: variantIdsToKeep }
                    }
                })
            } catch (e) {
                // Si falla es porque está en un pedido activo, lo ignoramos para no dañar el pedido
            }
        }

        // 4. Actualizamos el stock exacto de cada variante
        for (const variant of result.data.variants) {
            if (variant.id) {
                // Si la variante ya existía, ajustamos su stock nuevo
                await prisma.materialvariant.update({
                    where: { id: variant.id },
                    data: {
                        specification: variant.specification,
                        stock: variant.stock,
                        totalStock: variant.totalStock
                    }
                })
            } else {
                // Si el administrador le dio a "+ Agregar Opción", crea la variante nueva
                await prisma.materialvariant.create({
                    data: {
                        materialId: id,
                        specification: variant.specification,
                        stock: variant.stock,
                        totalStock: variant.totalStock
                    }
                })
            }
        }

        revalidatePath('/admin/materials')
    } catch (error) {
        console.log(error)
        return { errors: [{ message: 'Error al actualizar en la base de datos' }] }
    }
}