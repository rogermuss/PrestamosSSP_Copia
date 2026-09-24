import AddMaterialForm from "@/components/materials/AddMaterialForm";
import MaterialForm from "@/components/materials/MaterialForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

export default async function CreateMaterialPage() {
  // Obtenemos las categorías de la BD para la Combo Box
  const categories = await prisma.category.findMany()

  return (
    <>
      <Heading>Añadir Nuevo Material</Heading>

      <AddMaterialForm>
        <MaterialForm categories={categories} />
      </AddMaterialForm>
    </>
  )
}