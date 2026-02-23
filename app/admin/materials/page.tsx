// --- START OF FILE page.tsx ---

import { redirect } from 'next/navigation'
import MaterialsPagination from "@/components/materials/MaterialsPagination"; // Renombrar
import MaterialTable from "@/components/materials/MaterialsTable"; // Renombrar
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from 'next/link';
import MaterialSearchForm from '@/components/materials/MaterialSearchForm'; // Renombrar

async function materialCount() {
  return await prisma.material.count()
}

async function getMaterials(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const materials = await prisma.material.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return materials
}

export type MaterialsWithCategory = Awaited<ReturnType<typeof getMaterials>>

export default async function MaterialsPage({searchParams} : { searchParams: {page: string}}) {
  const page = +searchParams.page || 1
  const pageSize = 10
  if(page < 0) redirect('/admin/materials') // Ruta actualizada

  const materialsData = getMaterials(page, pageSize)
  const totalMaterialsData = materialCount()
  const [ materials, totalMaterials] = await Promise.all([materialsData, totalMaterialsData])
  const totalPages = Math.ceil(totalMaterials / pageSize)

  if(page > totalPages && totalPages > 0) redirect('/admin/materials') // Ruta actualizada

  return (
      <>
          <Heading>Administrar Inventario</Heading>

          <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
              <Link
                  href={'/admin/materials/new'} // Ruta actualizada
                  className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
              >Añadir Material</Link>
              <MaterialSearchForm />
          </div>

          <MaterialTable
            materials={materials}
          />

          <MaterialsPagination 
            page={page}
            totalPages={totalPages}
          />
      </>
  )
}