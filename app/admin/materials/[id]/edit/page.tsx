// --- START OF FILE page.tsx ---

import EditMaterialForm from "@/components/materials/EditMaterialForm" // Renombrar componente
import MaterialForm from "@/components/materials/MaterialForm" // Renombrar componente
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

// La función ahora busca un Material
async function getMaterialById(id: number) {
    const material = await prisma.material.findUnique({
        where: {
            id
        }
    })
    if(!material) {
        notFound()
    }
    return material
}

export default async function EditMaterialPage({ params }: { params: { id: string } }) {
    const material = await getMaterialById(+params.id)

    return (
        <>
            <Heading>Editar Material: {material.name}</Heading>

            <GoBackButton />

            {/* Los formularios ahora manejan materiales */}
            <EditMaterialForm>
                <MaterialForm 
                    material={material}
                />
            </EditMaterialForm>
        </>
    )
}