// --- START OF FILE AddMaterialForm.tsx ---

"use client"
import { createMaterial } from "@/actions/create-material-action" // Deberás crear esta server action
import { MaterialSchema } from "@/src/schema" // Deberás crear/actualizar este schema
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AddMaterialForm({children}: {children : React.ReactNode}) {
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            stock: formData.get('stock'), // Se añade stock
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        
        // El schema debe validar 'stock' como número y no 'price'
        const result = MaterialSchema.safeParse(data) 
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        // La server action ahora crea un material
        const response = await createMaterial(result.data) 
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        toast.success('Material Creado Correctamente')
        router.push('/admin/materials') // Redirige a la página de materiales
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                action={handleSubmit}
            >
                {children}
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Registrar Material' // Texto actualizado
                />
            </form>
        </div>
    )
}