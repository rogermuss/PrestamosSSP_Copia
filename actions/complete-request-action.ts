// --- START OF FILE complete-request-action.ts ---

"use server"
import { revalidatePath } from 'next/cache'
import { prisma } from "@/src/lib/prisma"
import { RequestIdSchema } from "@/src/schema" // 1. Usará un nuevo schema para validar el ID

export async function completeRequest(formData: FormData) {
    const data = {
        // 2. El campo del formulario ahora se llama 'request_id'
        requestId: formData.get('request_id') 
    }

    const result = RequestIdSchema.safeParse(data)

    if (result.success) {
        try {
            // Usamos una transacción para actualizar la solicitud y el stock al mismo tiempo
            await prisma.$transaction(async (tx) => {
                // Primero, obtenemos la solicitud con sus productos
                const request = await tx.materialRequest.findUnique({
                    where: { id: result.data.requestId },
                    include: {
                        requestedProducts: true
                    }
                })

                if (!request) {
                    throw new Error('Solicitud no encontrada')
                }

                // Segundo, actualizamos el stock de cada material
                for (const item of request.requestedProducts) {
                    await tx.material.update({
                        where: { id: item.materialId },
                        data: {
                            stock: {
                                decrement: item.quantity
                            }
                        }
                    })
                }

                // Tercero, marcamos la solicitud como completada
                await tx.materialRequest.update({
                    where: { id: result.data.requestId },
                    data: {
                        isCompleted: true,
                        completedAt: new Date()
                    }
                })
            })

            // Revalida las rutas para que se actualice la UI
            revalidatePath('/admin/requests')
        } catch (error) {
            console.log(error)
        }
    }
}