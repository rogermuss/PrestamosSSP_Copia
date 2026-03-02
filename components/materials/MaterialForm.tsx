"use client" // Necesario para poder usar el estado (useState) de las variantes

import { category } from "@prisma/client"
import ImageUpload from "./ImageUpload"
import { useState } from "react"

export default function MaterialForm({ material, categories }: { material?: any, categories: category[] }) {
    
    // Estado para manejar las opciones. Por defecto pone "Estándar" con stock 0.
    const [variants, setVariants] = useState<any[]>(
        material?.variants || [{ specification: "Estándar", stock: 0, totalStock: 0 }]
    )

    // Funciones para agregar, borrar o escribir en las variantes
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
        newVariants[index] = { ...newVariants[index], [field]: value }
        setVariants(newVariants)
    }

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="name" className="text-slate-800">Nombre del Componente/Material</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Ej. Resistencia"
                    defaultValue={material?.name}
                />
            </div>

            
            <div className="space-y-2">
                <label htmlFor="description" className="text-slate-800">Descripción / Detalles (Opcional)</label>
                <textarea
                    id="description"
                    name="description"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Ej. Resistencia de 1k ohm"
                    defaultValue={material?.description}
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="categoryId" className="text-slate-800">Categoría</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={material?.categoryId}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <ImageUpload image={material?.image} />

            {/* Creador de Opciones / Variantes */}
            <div className="space-y-4 p-4 border rounded bg-slate-50">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Especificaciones (Combo Box)</h3>
                    <button type="button" onClick={addVariant} className="bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-1 rounded text-sm transition">
                        + Agregar Opción
                    </button>
                </div>

                {/* empaqueta todas las filas para mandarlas al servidor */}
                <input type="hidden" name="variants" value={JSON.stringify(variants)} />

                {variants.map((variant, index) => (
                    <div key={index} className="flex gap-4 items-end bg-white p-3 border rounded shadow-sm">
                        <div className="flex-1">
                            <label className="text-xs text-slate-500 font-bold uppercase">Especificación</label>
                            <input
                                type="text"
                                value={variant.specification}
                                onChange={(e) => updateVariant(index, 'specification', e.target.value)}
                                className="block w-full p-2 bg-slate-100 text-sm"
                                placeholder='Ej: "1k ohm", "Rojo", o dejar en "Estándar"'
                            />
                        </div>
                        <div className="w-24">
                            <label className="text-xs text-slate-500 font-bold uppercase">Stock</label>
                            <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    updateVariant(index, 'stock', val);
                                    updateVariant(index, 'totalStock', val); // Al crear, el total inicia igual que el stock
                                }}
                                className="block w-full p-2 bg-slate-100 text-sm"
                                min="0"
                            />
                        </div>
                        {variants.length > 1 && (
                            <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded">
                                X
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}