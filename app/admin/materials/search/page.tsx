// --- START OF FILE page.tsx ---

import MaterialSearchForm from "@/components/materials/MaterialSearchForm";
import MaterialTable from "@/components/materials/MaterialsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

// La función ahora busca en el modelo Material
async function searchMaterials(searchTerm: string) {
    const materials = await prisma.material.findMany({
        where: {
            name: {
                contains: searchTerm
                // La línea "mode: 'insensitive'" ha sido eliminada.
            }
        },
        include: {
            category: true
        }
    })
    return materials
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const materials = await searchMaterials(searchParams.search)

    return (
        <>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>

            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <MaterialSearchForm />
            </div>

            {materials.length ? (
                <MaterialTable
                    materials={materials}
                />
            ) : <p className="text-center text-lg">No hay resultados</p>}
        </>
    )
}