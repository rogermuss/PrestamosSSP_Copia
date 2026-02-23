// --- START OF FILE RequestItemDetails.tsx ---

import { XCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { RequestItem } from "@/src/types" // Tipo actualizado
import { useStore } from '@/src/store'
import { useMemo } from 'react'

type RequestItemDetailsProps = {
    item: RequestItem
}

// El máximo de items ahora se basa en el stock disponible
const MIN_ITEMS = 1

export default function RequestItemDetails({ item }: RequestItemDetailsProps) {
    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    const removeItem = useStore((state) => state.removeItem)

    // Deshabilitar botones se basa en mínimo 1 y máximo el stock del item
    const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item])
    const disableIncreaseButton = useMemo(() => item.quantity === item.stock, [item])

    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                {/* La información de precio y subtotal se elimina */}
                <p className="text-sm text-gray-500">
                    Disponibles: {item.stock}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={disableDecreaseButton}
                        className='disabled:opacity-20'
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>
                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>
                    <button
                        type='button'
                        onClick={() => increaseQuantity(item.id)}
                        className="disabled:opacity-20"
                        disabled={disableIncreaseButton}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}