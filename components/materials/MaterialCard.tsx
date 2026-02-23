import { getCategorySlug } from "@/src/utils"
import { Material } from "@prisma/client"
import Image from "next/image"
import AddMaterialButton from "./AddMaterialButton"

type MaterialWithTotal = Material & {
  totalStock: number;
}

type MaterialCardProps = {
    material: MaterialWithTotal
}

export default function MaterialCard({material} : MaterialCardProps) {
  const categoryName = getCategorySlug(material.categoryId)
  const imagePath = `/icon_${categoryName}.svg`

  return (
    <div className="border bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 flex items-center justify-center p-4">
        <div className="relative w-20 h-20">
          <Image
            src={imagePath}
            alt={`${material.name} - ${categoryName.replace('-', ' ')}`}
            fill
            sizes="80px"
            className="opacity-80"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-bold leading-tight">{material.name}</h3>
        <p className="mt-2 font-bold text-sm text-amber-500">
          Disponibles: {material.stock}/{material.totalStock}
        </p>
        <div className="mt-2">
          <AddMaterialButton material={material} />
        </div>
      </div>
    </div>
  )
}