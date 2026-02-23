// --- START OF FILE MaterialsPagination.tsx ---

import Link from "next/link";

type MaterialsPaginationProps = {
    page: number
    totalPages: number
}

export default function MaterialsPagination({ page, totalPages }: MaterialsPaginationProps) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1 )

    return (
        <nav className='flex justify-center py-10'>

            {page > 1 && (
                <Link
                    href={`/admin/materials?page=${page - 1}`} // Ruta actualizada
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >«</Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`/admin/materials?page=${currentPage}`} // Ruta actualizada
                    className={`${page === currentPage && 'font-black'} bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >{currentPage}</Link>
            ))}

            {page < totalPages && (
                <Link
                    href={`/admin/materials?page=${page + 1}`} // Ruta actualizada
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >»</Link>
            )}
        </nav>
    )
}