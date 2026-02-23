import { getSession } from "@/src/lib/session"
import { logoutAction } from "@/actions/logout-action"

export default async function UserHeader() {
  const session = await getSession()

  if (!session) return null

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {session.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{session.name}</p>
            <p className="text-xs text-gray-500">{session.email}</p>
          </div>
        </div>
        
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
