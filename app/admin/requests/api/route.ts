import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    // Las consultas ahora apuntan a las tablas en minúsculas y sus nuevas relaciones (Variantes)
    const requests = await prisma.materialrequest.findMany({
        where: {
            isCompleted: false
        },
        include: {
            user: true, 
            requestproduct: { 
                include: {
                    variant: {
                        include: {
                            material: true
                        }
                    }
                }
            }
        }
    })
    return Response.json(requests)
}