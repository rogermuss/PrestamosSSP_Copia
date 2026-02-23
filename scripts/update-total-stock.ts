// archivo: scripts/update-total-stock.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Obtener todos los materiales
    const materials = await prisma.material.findMany()
    
    // Actualizar cada material
    for (const material of materials) {
        // Establecer el totalStock como el stock actual + un margen del 20%
        const totalStock = Math.ceil(material.stock * 1.2)
        
        await prisma.material.update({
            where: { id: material.id },
            data: { totalStock }
        })
        
        console.log(`Actualizado ${material.name}: stock=${material.stock}, totalStock=${totalStock}`)
    }
    
    console.log('Actualización de totalStock completada')
}

main()
    .catch((e) => {
        console.error('Error durante la actualización:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
