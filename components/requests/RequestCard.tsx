// --- START OF FILE RequestCard.tsx ---
import { completeRequest } from "@/actions/complete-request-action" 

type RequestCardProps = {
    request: any 
}

export default function RequestCard({ request }: RequestCardProps) {
    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <div className="border-b border-gray-300 pb-4">
                <p className='text-2xl font-medium text-gray-900'>Solicitante: {request.requesterName}</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{request.user?.email || 'Email no disponible'}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                    ID Usuario: {request.userId}
                </p>
            </div>
            <p className='text-lg font-medium text-gray-900'>Materiales Solicitados:</p>
            <dl className="mt-6 space-y-4">
                {request.requestproduct.map((item: any) =>(
                    <div 
                        key={item.variantId} 
                        className="flex items-center gap-2 border-t border-gray-200 pt-4"
                    >
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">({item.quantity}) {''}</span>
                        </dt>
                        {/* Entramos a variant.material para leer el nombre y especificacion */}
                        <dd className="text-sm font-medium text-gray-900">
                            {item.variant.material.name} 
                            {item.variant.specification !== "Estándar" && ` (${item.variant.specification})`}
                        </dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total de Items:</dt>
                    <dd className="text-base font-medium text-gray-900">{request.totalItems}</dd>
                </div>
            </dl>

            <form action={completeRequest}>
                <input 
                    type="hidden"
                    value={request.id}
                    name="request_id" 
                />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Solicitud Completada' 
                />
            </form>
        </section>
    )
}