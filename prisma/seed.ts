// archivo: prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { categories } from './data/categories'
import { materials } from './data/materials'

const prisma = new PrismaClient()

async function main() {
    try {
        // Crea usuarios de ejemplo
        await prisma.user.createMany({
            data: [
                { email: 'estudiante1@universidad.edu', name: 'Juan Pérez' },
                { email: 'estudiante2@universidad.edu', name: 'María García' },
                { email: 'profesor@universidad.edu', name: 'Dr. Carlos López' }
            ]
        })
        console.log('Usuarios creados exitosamente.')

        //Crea las categorías
        await prisma.category.createMany({
            data: categories
        })
        console.log('Categorías creadas exitosamente.')

        for (const item of materials) {
            await prisma.material.create({
                data: {
                    name: item.name,
                    image: item.image,
                    categoryId: item.categoryId,
                    variants: {
                        create: [
                            {
                                specification: "Estándar",
                                stock: item.stock,
                                totalStock: item.totalStock || item.stock
                            }
                        ]
                    }
                }
            })
        }
        console.log('Seeding de los materiales y variantes completado exitosamente.')

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