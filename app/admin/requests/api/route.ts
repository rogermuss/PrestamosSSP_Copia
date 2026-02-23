// --- START OF FILE route.ts ---

import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    // Cambiamos Order -> MaterialRequest y los nombres de los campos y relaciones
    const requests = await prisma.materialRequest.findMany({
        where: {
            isCompleted: false // status -> isCompleted
        },
        include: {
            user: true, // Incluir información del usuario
            requestedProducts: { // orderProducts -> requestedProducts
                include: {
                    material: true // product -> material
                }
            }
        }
    })
    return Response.json(requests)
}