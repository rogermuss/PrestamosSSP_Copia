import { create } from 'zustand'

// Usamos any temporalmente para evitar que TypeScript se queje por el cambio de estructura
interface Store {
    request: any[] 
    addToRequest: (item: any) => void 
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeItem: (id: number) => void
    clearRequest: () => void
}

export const useStore = create<Store>((set, get) => ({
    request: [],
    
    addToRequest: (itemToAdd) => {
        let request: any[] = []
        // Buscamos si la VARIANTE ya está en el carrito
        const existingItem = get().request.find(item => item.id === itemToAdd.id)

        if (existingItem) {
            request = get().request.map(item =>
                item.id === itemToAdd.id && item.quantity < item.stock ? {
                    ...item,
                    quantity: item.quantity + 1,
                } : item
            )
        } else {
            if (itemToAdd.stock > 0) {
                request = [...get().request, {
                    ...itemToAdd,
                    quantity: 1
                }]
            } else {
                request = get().request
            }
        }
        
        set(() => ({ request }))
    },

    increaseQuantity: (id) => {
        set((state) => ({
            request: state.request.map(item =>
                item.id === id && item.quantity < item.stock ? {
                    ...item,
                    quantity: item.quantity + 1,
                } : item
            )
        }))
    },

    decreaseQuantity: (id) => {
        set((state) => ({
            request: state.request.map(item =>
                item.id === id && item.quantity > 1 ? {
                    ...item,
                    quantity: item.quantity - 1,
                } : item
            )
        }))
    },

    removeItem: (id) => {
        set((state) => ({
            request: state.request.filter(item => item.id !== id)
        }))
    },

    clearRequest: () => {
        set(() => ({ request: [] }))
    }
}))