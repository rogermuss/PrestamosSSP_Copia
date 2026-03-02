"use client" // Necesario para usar useState con la Combo Box
import { getCategorySlug } from "@/src/utils"
import Image from "next/image"
import AddMaterialButton from "./AddMaterialButton"
import { useState } from "react"

type MaterialCardProps = {
    material: any // Usamos any para no pelear con los tipos viejos por ahora
}

export default function MaterialCard({material} : MaterialCardProps) {
  const categoryName = getCategorySlug(material.categoryId)
  const imagePath = `/icon_${categoryName}.svg`

  const [selectedVariant, setSelectedVariant] = useState(material.variants[0])

  return (
    <div className="border bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 flex items-center justify-center p-4">
        <div className="relative w-20 h-20">
          <Image
            src={imagePath}
            alt={material.name}
            fill
            sizes="80px"
            className="opacity-80"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-bold leading-tight">{material.name}</h3>
        
        {/* LA COMBO BOX MÁGICA */}
        {material.variants.length > 1 ? (
            <select 
                className="mt-2 w-full p-2 border bg-slate-50 text-sm rounded-md"
                onChange={(e) => {
                    const variantId = parseInt(e.target.value)
                    const found = material.variants.find((v: any) => v.id === variantId)
                    setSelectedVariant(found)
                }}
            >
                {material.variants.map((v: any) => (
                    <option key={v.id} value={v.id}>
                        {v.specification}
                    </option>
                ))}
            </select>
        ) : (
            // Si solo tiene la opción estándar, la mostramos como texto
            <p className="mt-2 text-sm text-slate-500">{selectedVariant?.specification}</p>
        )}

        <p className="mt-2 font-bold text-sm text-amber-500">
          Disponibles: {selectedVariant?.stock}/{selectedVariant?.totalStock}
        </p>
        
        <div className="mt-2">
          {/* Pasamos la variante elegida al botón */}
          <AddMaterialButton material={material} selectedVariant={selectedVariant} />
        </div>
      </div>
    </div>
  )
}