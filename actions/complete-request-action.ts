"use server"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function completeRequest(formData: FormData) {
    const requestId = formData.get('request_id')

    try {
        // 1. Buscamos el pedido con sus variantes conectadas
        const request = await prisma.materialrequest.findUnique({
            where: { id: Number(requestId) },
            include: { requestproduct: true }
        })

        if (!request) return

        // 2. Descontamos el stock de CADA VARIANTE solicitada
        for (const item of request.requestproduct) {
            await prisma.materialvariant.update({
                where: { id: item.variantId }, 
                data: {
                    stock: {
                        decrement: item.quantity 
                    }
                }
            })
        }

        // 3. Marcamos el pedido como completado en la base de datos
        await prisma.materialrequest.update({
            where: { id: Number(requestId) },
            data: {
                isCompleted: true,
                completedAt: new Date()
            }
        })

        // 4. Refrescamos la pantalla para que desaparezca
        revalidatePath('/admin/requests')

    } catch (error) {
        console.log(error)
    }
}