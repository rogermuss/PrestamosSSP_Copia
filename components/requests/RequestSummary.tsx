// --- START OF FILE RequestSummary.tsx ---

"use client"
import { useMemo, useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { useStore } from "@/src/store"
import RequestItemDetails from "./RequestItemDetails" // Componente renombrado
import { createRequest } from "@/actions/create-request-action" // Action renombrada
import { RequestSchema } from "@/src/schema" // Schema actualizado

export default function RequestSummary() {
  const request = useStore((state) => state.request)
  const clearRequest = useStore((state) => state.clearRequest)
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  
  // Obtener datos del usuario de la sesión
  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserName(data.user.name)
          setUserEmail(data.user.email)
        }
      })
      .catch(err => console.error('Error al obtener sesión:', err))
  }, [])
  
  // El total es la suma de las cantidades, no de precios
  const totalItems = useMemo(() => request.reduce((total, item) => total + item.quantity, 0), [request])

  const handleCreateRequest = async (formData: FormData) => {
      const data = {
        requesterName: userEmail, // Usar el email del usuario en sesión
        total: totalItems,
        request
      }

      // El schema ahora valida 'requesterName' y la estructura de la solicitud
      const result = RequestSchema.safeParse(data) 
      if(!result.success) {
        result.error.issues.forEach((issue) => {
          toast.error(issue.message)
        })
        return
      }

      const response = await createRequest(result.data)
      if(response?.errors) {
        response.errors.forEach((issue) => {
          toast.error(issue.message)
        })
        return
      }

      toast.success('Solicitud Realizada Correctamente')
      clearRequest()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi Solicitud</h1>

        {request.length === 0 ? <p className="text-center my-10">No has agregado materiales</p> : (
          <div className="mt-5">
              {request.map(item => (
                  <RequestItemDetails
                      key={item.id}
                      item={item}
                  />
              ))}
              <p className="text-2xl mt-20 text-center">
                Total de Materiales: {''}
                <span className="font-bold">{totalItems}</span>
              </p>
              <form 
                className="w-full mt-10 space-y-5"
                action={handleCreateRequest}
              >
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solicitante
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {userName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{userName || 'Cargando...'}</p>
                        <p className="text-sm text-gray-500">{userEmail || 'Cargando...'}</p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    disabled={!userEmail}
                    className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
                    value='Confirmar Solicitud'
                  />
              </form>
          </div>
        )}
    </aside>
  )
}