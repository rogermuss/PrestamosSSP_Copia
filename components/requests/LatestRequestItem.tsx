// --- START OF FILE LatestRequestItem.tsx ---

import { RequestWithMaterials } from "@/src/types"

type LatestRequestItemProps = {
    request: RequestWithMaterials
}

export default function LatestRequestItem({request}: LatestRequestItemProps) {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
        <div className="border-b border-gray-200 pb-3">
            <p className="text-2xl font-bold text-slate-600">
                Solicitante: {request.requesterName}
            </p>
            <p className="text-sm text-gray-500 mt-1">
                {request.user.email}
            </p>
        </div>
        <ul 
            className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
            role="list"
        >
            {request.requestedProducts.map(item => (
                <li
                    key={item.id}
                    className="flex py-6 text-lg"
                >
                    <p>
                        <span className="font-bold">
                            ({item.quantity}) {''}
                        </span>
                        {item.material.name}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}