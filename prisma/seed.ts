// archivo: prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { categories } from './data/categories'
import { materials } from './data/materials'

const prisma = new PrismaClient()

async function main() {
    try {
        // 1. Crear usuarios de ejemplo
        await prisma.user.createMany({
            data: [
                { email: 'estudiante1@universidad.edu', name: 'Juan Pérez' },
                { email: 'estudiante2@universidad.edu', name: 'María García' },
                { email: 'profesor@universidad.edu', name: 'Dr. Carlos López' }
            ]
        })
        console.log('Usuarios creados exitosamente.')

        // 2. Crear las categorías
        await prisma.category.createMany({
            data: categories
        })
        console.log('Categorías creadas exitosamente.')

        // 3. Crear los materiales con su variante "Estándar" adaptado al nuevo modelo
        for (const item of materials) {
            await prisma.material.create({
                data: {
                    name: item.name,
                    image: item.image,
                    categoryId: item.categoryId,
                    // Dejamos la descripción nula por defecto
                    // Creamos automáticamente la variante estándar con el stock viejo
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