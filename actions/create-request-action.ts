// --- START OF FILE create-request-action.ts ---

"use server"
import { prisma } from "@/src/lib/prisma"
import { RequestSchema } from "@/src/schema" // 1. Usa el nuevo RequestSchema
import { getSession } from "@/src/lib/session"

export async function createRequest(data: unknown) {
    // Verificar que haya una sesión activa
    const session = await getSession()
    if (!session) {
        return {
            errors: [{ message: 'Debes iniciar sesión para crear una solicitud' }]
        }
    }

    const result = RequestSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        // Solo creamos la solicitud, el stock se actualizará cuando el admin la complete
        await prisma.materialRequest.create({
            data: {
                requesterName: result.data.requesterName,
                userId: session.id, // Vincular la solicitud al usuario actual
                totalItems: result.data.total,
                requestedProducts: {
                    create: result.data.request.map(item => ({
                        materialId: item.id,
                        quantity: item.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}