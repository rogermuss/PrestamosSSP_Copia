"use client" 
import { category } from "@prisma/client"
import ImageUpload from "./ImageUpload"
import { useState } from "react"

export default function MaterialForm({ material, categories }: { material?: any, categories: category[] }) {
    
    const [variants, setVariants] = useState<any[]>(
        material?.variants || [{ specification: "Estándar", stock: 0, totalStock: 0 }]
    )

    const addVariant = () => {
        setVariants([...variants, { specification: "", stock: 0, totalStock: 0 }])
    }

    const removeVariant = (index: number) => {
        const newVariants = [...variants]
        newVariants.splice(index, 1)
        setVariants(newVariants)
    }

    const updateVariant = (index: number, field: string, value: string | number) => {
        const newVariants = [...variants]
        
        if (field === 'totalStock') {
            const newVal = typeof value === 'string' ? parseInt(value) || 0 : value;
            const oldTotal = newVariants[index].totalStock || 0;
            const diff = newVal - oldTotal;
            newVariants[index].totalStock = newVal;
            newVariants[index].stock = Math.max(0, (newVariants[index].stock || 0) + diff);
        } else {
            newVariants[index][field] = value
        }
        setVariants(newVariants)
    }

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="name" className="text-slate-800">Nombre del Componente</label>
                <input id="name" name="name" type="text" className="block w-full p-3 bg-slate-100" defaultValue={material?.name} />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-slate-800">Descripción</label>
                <textarea id="description" name="description" className="block w-full p-3 bg-slate-100" defaultValue={material?.description} rows={3} />
            </div>

            <div className="space-y-2">
                <label htmlFor="categoryId" className="text-slate-800">Categoría</label>
                <select className="block w-full p-3 bg-slate-100" id="categoryId" name="categoryId" defaultValue={material?.categoryId}>
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <ImageUpload image={material?.image} />

            <div className="space-y-4 p-4 border rounded bg-slate-50">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Variantes / Especificaciones</h3>
                    <button type="button" onClick={addVariant} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">+ Agregar</button>
                </div>

                <input type="hidden" name="variants" value={JSON.stringify(variants)} />

                {variants.map((variant, index) => (
                    <div key={index} className="flex gap-4 items-end bg-white p-3 border rounded shadow-sm">
                        <div className="flex-1">
                            <label className="text-xs font-bold uppercase">Especificación</label>
                            <input type="text" value={variant.specification} onChange={(e) => updateVariant(index, 'specification', e.target.value)} className="block w-full p-2 bg-slate-100 text-sm" />
                        </div>
                        <div className="w-24">
                            <label className="text-xs font-bold uppercase text-slate-400">Actual</label>
                            <input type="number" value={variant.stock} readOnly className="block w-full p-2 bg-slate-200 text-sm cursor-not-allowed" />
                        </div>
                        <div className="w-24">
                            <label className="text-xs font-bold uppercase text-indigo-600">Total</label>
                            <input type="number" value={variant.totalStock} onChange={(e) => updateVariant(index, 'totalStock', e.target.value)} className="block w-full p-2 bg-indigo-50 text-sm font-bold" />
                        </div>
                        {variants.length > 1 && (
                            <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 text-white px-3 py-2 rounded text-xs">X</button>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}