// --- START OF FILE route.tsx ---

import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'

export async function GET() {
    // Se actualiza la consulta para solicitudes completadas
    const requests = await prisma.materialRequest.findMany({
        take: 5,
        where: {
            completedAt: { // orderReadyAt -> completedAt
                not: null
            }
        },
        orderBy: {
            completedAt: 'desc' // orderReadyAt -> completedAt
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