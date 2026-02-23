// --- START OF FILE page.tsx ---

"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { RequestWithMaterials } from "@/src/types"; // Actualizar tipo
import LatestRequestItem from "@/components/requests/LatestRequestItem"; // Renombrar

export default function CompletedRequestsPage() {
    const url = '/requests/api' // Ruta de API actualizada
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<RequestWithMaterials[]>(url, fetcher, {
        refreshInterval: 1000,
        revalidateOnFocus: false,
    })
    
    if (isLoading) return <p>Cargando...</p>

    if (data) return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black">Solicitudes Listas</h1>

            <Logo />

            {data.length ? (
                <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                    {data.map(request => (
                        <LatestRequestItem 
                            key={request.id}
                            request={request}
                        />
                    ))}
                </div>
            ) : <p className="text-center my-10">No hay solicitudes listas para recoger</p>}
        </>
    )
}