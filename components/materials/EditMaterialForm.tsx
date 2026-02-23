// --- START OF FILE EditMaterialForm.tsx ---

"use client"
import { updateMaterial } from "@/actions/update-material-action" // Deberás crear/renombrar esta action
import { MaterialSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"

export default function EditMaterialForm({children}: {children : React.ReactNode}) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            stock: formData.get('stock'), // Se edita el stock
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        
        const result = MaterialSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        const response = await updateMaterial(result.data, id)
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        toast.success('Material Actualizado Correctamente')
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
                    value='Guardar Cambios'
                />
            </form>
        </div>
    )
}