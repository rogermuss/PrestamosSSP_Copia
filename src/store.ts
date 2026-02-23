// src/store.ts

import { create } from 'zustand'
import { RequestItem } from './types' // 1. Importamos el nuevo tipo RequestItem
import { Material } from '@prisma/client' // 2. Importamos el modelo Material

interface Store {
    request: RequestItem[] // 3. Renombramos 'order' a 'request'
    addToRequest: (material: Material) => void // 4. Renombramos y cambiamos el parámetro
    increaseQuantity: (id: Material['id']) => void
    decreaseQuantity: (id: Material['id']) => void
    removeItem: (id: Material['id']) => void
    clearRequest: () => void
}

export const useStore = create<Store>((set, get) => ({
    request: [],
    
    // Lógica para añadir un material a la solicitud
    addToRequest: (material) => {
        // 5. Excluimos los campos que no necesitamos en el item de la solicitud
        const { categoryId, image, ...data } = material
        
        let request: RequestItem[] = []
        const existingItem = get().request.find(item => item.id === material.id)

        if (existingItem) {
            // Si el item ya existe, incrementamos su cantidad si el stock lo permite
            request = get().request.map(item =>
                item.id === material.id && item.quantity < item.stock ? {
                    ...item,
                    quantity: item.quantity + 1,
                } : item
            )
        } else {
            // Si es un item nuevo y hay stock, lo agregamos con cantidad 1
            if (material.stock > 0) {
                request = [...get().request, {
                    ...data,
                    quantity: 1
                }]
            } else {
                // Si no hay stock, no hacemos nada y mantenemos la solicitud como está
                request = get().request
            }
        }
        
        set(() => ({
            request // 6. Actualizamos el estado 'request'
        }))
    },

    // Lógica para aumentar la cantidad de un item
    increaseQuantity: (id) => {
        set((state) => ({
            request: state.request.map(item =>
                // Solo incrementa si la cantidad es menor que el stock disponible
                item.id === id && item.quantity < item.stock ? {
                    ...item,
                    quantity: item.quantity + 1,
                } : item
            )
        }))
    },

    // Lógica para disminuir la cantidad de un item
    decreaseQuantity: (id) => {
        set((state) => ({
            request: state.request.map(item =>
                // No permitimos que la cantidad baje de 1
                item.id === id && item.quantity > 1 ? {
                    ...item,
                    quantity: item.quantity - 1,
                } : item
            )
        }))
    },

    // Lógica para eliminar un item de la solicitud
    removeItem: (id) => {
        set((state) => ({
            request: state.request.filter(item => item.id !== id)
        }))
    },

    // Lógica para limpiar/vaciar la solicitud completa
    clearRequest: () => {
        set(() => ({
            request: []
        }))
    }
}))