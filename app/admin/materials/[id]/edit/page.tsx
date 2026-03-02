import EditMaterialForm from "@/components/materials/EditMaterialForm" 
import MaterialForm from "@/components/materials/MaterialForm" 
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getMaterialById(id: number) {
    const material = await prisma.material.findUnique({
        where: { id },
        include: { variants: true } 
    })
    if(!material) {
        notFound()
    }
    return material
}

export default async function EditMaterialPage({ params }: { params: { id: string } }) {
    const material = await getMaterialById(+params.id)
    
    
    const categories = await prisma.category.findMany()

    return (
        <>
            <Heading>Editar Material: {material.name}</Heading>

            <GoBackButton />

            <EditMaterialForm>
                <MaterialForm 
                    material={material}
                    categories={categories} 
                />
            </EditMaterialForm>
        </>
    )
}