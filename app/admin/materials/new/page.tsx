// --- START OF FILE page.tsx ---

import AddMaterialForm from "@/components/materials/AddMaterialForm"; // Renombrar componente
import MaterialForm from "@/components/materials/MaterialForm"; // Renombrar componente
import Heading from "@/components/ui/Heading";

export default function CreateMaterialPage() {
  return (
    <>
      <Heading>Añadir Nuevo Material</Heading>

      {/* Los formularios ahora se encargan de crear materiales */}
      <AddMaterialForm>
        <MaterialForm />
      </AddMaterialForm>
    
    </>
  )
}