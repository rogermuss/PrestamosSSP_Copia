// --- START OF FILE page.tsx ---

"use client"
import useSWR from 'swr'
import RequestCard from "@/components/requests/RequestCard"; // Deberás crear/renombrar este componente
import Heading from "@/components/ui/Heading";
import { RequestWithMaterials } from '@/src/types'; // Deberás actualizar este tipo

export default function RequestsPage() {
  // La URL debe coincidir con la nueva ruta de la API
  const url = '/admin/requests/api' 
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  // El tipo genérico se actualiza a la nueva estructura
  const { data, error, isLoading } = useSWR<RequestWithMaterials[]>(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false,
  })

  if(isLoading) return <p>Cargando solicitudes...</p>
  
  if(data) return (
    <>
      <Heading>Administrar Solicitudes de Materiales</Heading>

      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map(request => (
            <RequestCard 
              key={request.id}
              request={request} // Pasamos la solicitud al componente
            />
          ))}
        </div>
      ) : <p className="text-center">No hay solicitudes Pendientes</p>}
    </>
  )
}