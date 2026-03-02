"use client"
import { createMaterial } from "@/actions/create-material-action" 
import { MaterialSchema } from "@/src/schema" 
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AddMaterialForm({children}: {children : React.ReactNode}) {
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        // Extraemos los datos nuevos incluyendo descripción y variantes
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image'),
            variants: JSON.parse(formData.get('variants') as string || '[]')
        }
        
        const result = MaterialSchema.safeParse(data) 
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        const response = await createMaterial(result.data) 
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        toast.success('Material Creado Correctamente')
        router.push('/admin/materials') 
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form className="space-y-5" action={handleSubmit}>
                {children}
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Registrar Material'
                />
            </form>
        </div>
    )
}