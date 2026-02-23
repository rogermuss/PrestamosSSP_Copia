// archivo: prisma/seed.ts

import { PrismaClient, Prisma } from '@prisma/client'
import { categories } from './data/categories'
import { materials } from './data/materials'

const prisma = new PrismaClient()

// Asegurándonos de que los tipos coincidan con lo que espera Prisma
const materialsWithTotalStock: Prisma.MaterialCreateManyInput[] = materials.map(material => ({
    ...material,
    totalStock: material.totalStock || material.stock // Si no existe totalStock, usa el valor de stock
}))

async function main() {
    try {
        // @ts-ignore - User model will be available after running migration
        // Primero, crear usuarios de ejemplo
        const users = await prisma.user.createMany({
            data: [
                {
                    email: 'estudiante1@universidad.edu',
                    name: 'Juan Pérez'
                },
                {
                    email: 'estudiante2@universidad.edu',
                    name: 'María García'
                },
                {
                    email: 'profesor@universidad.edu',
                    name: 'Dr. Carlos López'
                }
            ]
        })

        console.log('Usuarios creados exitosamente.')

        // Aquí se usan los datos de 'categories'
        await prisma.category.createMany({
            data: categories
        })

        // Y aquí se usan los datos de 'materials' con tipos correctos
        await prisma.material.createMany({
            data: materialsWithTotalStock
        })

        console.log('Seeding de la base de datos para laboratorio completado exitosamente.')

    } catch (error) {
        console.error('Error durante el seeding:', error)
        throw error
    }
}

main()
    .catch((e) => {
        console.error('El script de seeding ha fallado:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })