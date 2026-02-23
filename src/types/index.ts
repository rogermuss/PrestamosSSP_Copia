// /src/types/index.ts

// @ts-ignore - User model will be available after running: npx prisma migrate dev
import { Material, MaterialRequest, RequestProduct, User } from '@prisma/client'

// ESTE ES EL TIPO QUE FALTA:
// Representa un único material dentro de la "cesta" de solicitud del cliente.
// Es el tipo que usa tu store de Zustand.
export type RequestItem = Pick<Material, 'id' | 'name' | 'stock'> & {
    quantity: number
} 

// ESTE ES EL TIPO QUE YA TENÍAS (y está correcto):
// Representa una solicitud completa que ha sido guardada en la base de datos,
// incluyendo la información de los materiales relacionados y el usuario.
export type RequestWithMaterials = MaterialRequest & {
    user: User
    requestedProducts: (RequestProduct & {
        material: Material
    })[]
}