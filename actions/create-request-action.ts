"use server"
import { prisma } from "@/src/lib/prisma"
import { RequestSchema } from "@/src/schema" 
import { getSession } from "@/src/lib/session"

export async function createRequest(data: unknown) {
    const session = await getSession()
    if (!session) {
        return {
            errors: [{ message: 'Debes iniciar sesión para crear una solicitud' }]
        }
    }

    const result = RequestSchema.safeParse(data)

    if (!result.success) {
        return { errors: result.error.issues }
    }

    try {
        await prisma.materialrequest.create({
            data: {
                requesterName: result.data.requesterName,
                userId: session.id,
                totalItems: result.data.total,
                requestproduct: {
                    create: result.data.request.map(item => ({
                        variantId: item.id, // <-- AHORA USAMOS variantId
                        quantity: item.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
        return { errors: [{ message: 'Hubo un error en la base de datos al crear la solicitud' }] }
    }
}