// --- START OF FILE page.tsx ---

import MaterialCard from "@/components/materials/MaterialCard" // Renombrar componente
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

// La función ahora busca materiales por categoría
async function getMaterials(category: string) {
  const materials = await prisma.material.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return materials
}

export default async function RequestPage({params}: { params: { category : string }}) {
  const materials = await getMaterials(params.category)
  
  return (
    <>
      <Heading>
        Selecciona los materiales que necesitas
      </Heading>
    
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
          {materials.map(material => (
            <MaterialCard 
              key={material.id}
              material={material}
            />
          ))}
      </div>
    </>
  )
}