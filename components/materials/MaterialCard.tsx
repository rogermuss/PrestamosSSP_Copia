"use client"
import { getCategorySlug } from "@/src/utils"
import Image from "next/image"
import { useState } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"

type MaterialCardProps = {
    material: any 
}

export default function MaterialCard({material} : MaterialCardProps) {
    const categoryName = getCategorySlug(material.categoryId)
    const imagePath = `/icon_${categoryName}.svg`
    
    const addToRequest = useStore((state) => state.addToRequest)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const isSimpleComponent = material.variants.length === 1 && material.variants[0].specification === "Estándar"

    const filteredVariants = material.variants.filter((variant: any) =>
        variant.specification.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAdd = (variant: any) => {
        const itemForCart = {
            id: variant.id,
            materialId: material.id,
            name: `${material.name} ${variant.specification !== 'Estándar' ? `(${variant.specification})` : ''}`,
            stock: variant.stock,
            image: material.image,
            categoryId: material.categoryId
        }
        
        addToRequest(itemForCart as any)
        toast.info(`Añadido: ${variant.specification}`, { autoClose: 1000, hideProgressBar: true })
    }

    return (
        <>
            <div className="border bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
                <div className="h-40 flex items-center justify-center p-4 bg-white">
                    <div className="relative w-20 h-20">
                        <Image src={imagePath} alt={material.name} fill sizes="80px" className="opacity-80 object-contain" />
                    </div>
                </div>
                <div className="p-4 flex flex-col flex-grow border-t bg-slate-50">
                    <h3 className="text-lg font-black text-slate-800 mb-1">{material.name}</h3>
                    
                    {isSimpleComponent ? (
                        <div className="mt-auto pt-2">
                            <p className="text-sm font-bold text-slate-500 mb-3">
                                Disponibles: <span className="text-amber-500">{material.variants[0].stock}</span>
                            </p>
                            <button 
                                onClick={() => handleAdd(material.variants[0])}
                                disabled={material.variants[0].stock === 0}
                                className={`w-full py-3 uppercase font-black rounded-lg text-white transition-all ${material.variants[0].stock === 0 ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
                            >
                                {material.variants[0].stock === 0 ? 'Agotado' : 'Agregar'}
                            </button>
                        </div>
                    ) : (
                        <div className="mt-auto pt-2">
                            <p className="text-sm font-bold text-indigo-600 mb-3 bg-indigo-50 inline-block px-2 py-1 rounded">
                                {material.variants.length} variedades
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-3 uppercase font-black rounded-lg text-white bg-slate-800 hover:bg-black transition-all shadow-md"
                            >
                                Seleccionar Tipos
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        
                        <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800">{material.name}</h2>
                                <p className="text-sm text-slate-500">Selecciona todos los tipos que necesites</p>
                            </div>
                            <button onClick={() => { setIsModalOpen(false); setSearchTerm(""); }} className="bg-slate-200 hover:bg-red-100 hover:text-red-600 p-2 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-6">
                            <input
                                type="text"
                                placeholder="Escribe para filtrar (ej: 100uF, 10k...)"
                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-indigo-500 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="overflow-y-auto flex-1 px-6 pb-6 space-y-3">
                            {filteredVariants.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-slate-400 font-bold">No encontramos ese valor...</p>
                                </div>
                            ) : (
                                filteredVariants.map((variant: any) => (
                                    <div key={variant.id} className="flex justify-between items-center p-4 border-2 border-slate-50 rounded-xl hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group">
                                        <div>
                                            <p className="font-black text-slate-700 group-hover:text-indigo-600 transition-colors">{variant.specification}</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase">En estante: <span className="text-amber-500">{variant.stock}</span></p>
                                        </div>
                                        <button
                                            onClick={() => handleAdd(variant)}
                                            disabled={variant.stock === 0}
                                            className={`px-6 py-2 rounded-lg text-xs uppercase font-black transition-all ${variant.stock === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm'}`}
                                        >
                                            {variant.stock === 0 ? 'Sin Stock' : 'Añadir +'}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 bg-slate-50 border-t">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-3 bg-indigo-600 text-white font-black uppercase rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                            >
                                Listo, Ver mi pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}