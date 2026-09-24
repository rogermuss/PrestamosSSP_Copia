"use client"
import { useStore } from "@/src/store"

type AddMaterialButtonProps = {
    material: any;
    selectedVariant: any;
}

export default function AddMaterialButton({material, selectedVariant}: AddMaterialButtonProps) {
    const addToRequest = useStore((state) => state.addToRequest)  

    if(!selectedVariant || selectedVariant.stock === 0) {
        return (
            <button
                type="button"
                className="bg-gray-400 text-white w-full text-sm p-2 uppercase font-medium rounded cursor-not-allowed"
                disabled
            >Agotado</button>
        )
    }

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full text-sm p-2 uppercase font-medium cursor-pointer rounded"
            onClick={() => {
                const itemForCart = {
                    id: selectedVariant.id, 
                    materialId: material.id,
                    name: `${material.name} ${selectedVariant.specification !== 'Estándar' ? `(${selectedVariant.specification})` : ''}`,
                    stock: selectedVariant.stock,
                    image: material.image,
                    categoryId: material.categoryId
                }
                
               
                addToRequest(itemForCart as any)
            }}
        >Agregar a la Solicitud</button>
    )
}