// --- START OF FILE not-found.tsx ---

import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
        <Heading>Material No Encontrado</Heading>
        {/* El enlace ahora apunta a la página de materiales */}
        <Link
            href='/admin/materials'
            className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
        >Ir al Inventario</Link>
    </div>
  )
}