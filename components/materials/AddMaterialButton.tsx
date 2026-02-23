// --- START OF FILE AddMaterialButton.tsx ---

"use client"
import { Material } from "@prisma/client" // Se usa el tipo Material
import { useStore } from "@/src/store"

type AddMaterialButtonProps = {
    material: Material // Prop actualizada
}

export default function AddMaterialButton({material}: AddMaterialButtonProps) {
    // La acción del store se llamará 'addToRequest' o similar
    const addToRequest = useStore((state) => state.addToRequest)  

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full text-sm p-2 uppercase font-medium cursor-pointer rounded"
            onClick={() => addToRequest(material)}
        >Agregar a la Solicitud</button>
    )
}