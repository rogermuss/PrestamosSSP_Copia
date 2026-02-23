import { getSession } from "@/src/lib/session"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  // Si ya hay sesión, redirigir a la página principal
  const session = await getSession()
  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de Préstamos
          </h1>
          <p className="text-gray-600 mt-2">
            Laboratorio de Electrónica
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Nota:</span> Esta es una simulación de login universitario. 
            En producción se usará Google OAuth con cuentas @universidad.edu
          </p>
        </div>

        {searchParams.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              {searchParams.error === 'validation' 
                ? '❌ Error: Debes usar un email que termine en @universidad.edu y un nombre de al menos 3 caracteres.'
                : '❌ Error al iniciar sesión. Intenta nuevamente.'}
            </p>
          </div>
        )}

        <LoginForm />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>¿Problemas para acceder?</p>
          <p className="mt-1">Contacta al administrador del laboratorio</p>
        </div>
      </div>
    </div>
  )
}
