"use server"
import { prisma } from "@/src/lib/prisma"
import { MaterialSchema } from "@/src/schema"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMaterial(prevState: any, formData: FormData) {
    // 1. Transformamos los datos del FormData a un objeto que entienda nuestra validación Zod
    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        categoryId: formData.get('categoryId'),
        image: formData.get('image'),
        // Recuperamos el JSON del input oculto de variantes y lo convertimos a arreglo
        variants: JSON.parse(formData.get('variants') as string || '[]')
    }

    // 2. Validamos usando tu esquema Zod
    const result = MaterialSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    // 3. Magia de Prisma: Crea el Material y sus Opciones al mismo tiempo
    await prisma.material.create({
        data: {
            name: result.data.name,
            description: result.data.description,
            image: result.data.image || '',
            categoryId: result.data.categoryId,
            variants: {
                create: result.data.variants
            }
        }
    })

    // 4. Redirigimos al inventario al terminar
    revalidatePath('/admin/materials')
    redirect('/admin/materials')
}