// --- START OF FILE MaterialForm.tsx ---

import { prisma } from "@/src/lib/prisma"
import { Material } from "@prisma/client"

// Asegurarse de que Material incluye totalStock
type MaterialWithTotal = Material & {
  totalStock: number;
}

async function getCategories() {
    return await prisma.category.findMany()
}

type MaterialFormProps = {
    material?: MaterialWithTotal
}

export default async function MaterialForm({material}: MaterialFormProps) {
    const categories = await getCategories()

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Nombre:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Nombre del Material"
                    defaultValue={material?.name}
                />
            </div>

            {/* Campo de Precio ELIMINADO */}
            
            {/* Campo de Stock Actual */}
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="stock"
                >Stock Actual (Cantidad disponible):</label>
                <input
                    id="stock"
                    name="stock"
                    type="number"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Ej: 10"
                    defaultValue={material?.stock}
                />
            </div>

            {/* Campo de Stock Total */}
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="totalStock"
                >Stock Total (Cantidad total en inventario):</label>
                <input
                    id="totalStock"
                    name="totalStock"
                    type="number"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Ej: 100"
                    defaultValue={material?.totalStock}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Categoría:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={material?.categoryId}
                >
                    <option value=""> -- Seleccione -- </option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>
        </>
    )
}