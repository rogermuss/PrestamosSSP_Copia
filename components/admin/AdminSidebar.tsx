// --- START OF FILE AdminSidebar.tsx ---

import Logo from "../ui/Logo"
import AdminRoute from "./AdminRoute"

// Rutas actualizadas para el sistema de inventario
const adminNavigation = [
    {url: '/admin/requests', text: 'Solicitudes', blank: false},
    {url: '/admin/materials', text: 'Inventario', blank: false},
    {url: '/request/componentes', text: 'Ver Portal de Solicitud', blank: true},
]

export default function AdminSidebar() {

    return (
        <>
            <Logo />
            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navegación</p>
                <nav className="flex flex-col">
                    {adminNavigation.map(link => (
                        <AdminRoute
                            key={link.url}
                            link={link}
                        />
                    ))}
                </nav>
            </div>
        </>
    )
}