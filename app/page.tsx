// --- START OF FILE page.tsx ---

import { redirect } from "next/navigation";

export default function Home() {
  // Redirigimos a la primera categoría de materiales como página de inicio
  redirect('/request/componentes')
}