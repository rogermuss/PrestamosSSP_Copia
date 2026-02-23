"use server"
import { prisma } from "@/src/lib/prisma"
import { setSession } from "@/src/lib/session"
import { redirect } from "next/navigation"
import { z } from "zod"

const LoginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .endsWith('@universidad.edu', 'Debe usar un email universitario'),
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
})

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get('email'),
    name: formData.get('name')
  }

  const result = LoginSchema.safeParse(data)

  if (!result.success) {
    // En caso de error, simplemente redirigir de vuelta
    redirect('/login?error=validation')
  }

  try {
    // @ts-ignore - User model will be available after running migration
    // Buscar o crear el usuario
    let user = await prisma.user.findUnique({
      where: { email: result.data.email }
    })

    if (!user) {
      // @ts-ignore - User model will be available after running migration
      // Si el usuario no existe, lo creamos
      user = await prisma.user.create({
        data: {
          email: result.data.email,
          name: result.data.name
        }
      })
    }

    // Establecer la sesión
    await setSession({
      id: user.id,
      email: user.email,
      name: user.name
    })

  } catch (error) {
    console.error('Error en login:', error)
    redirect('/login?error=server')
  }

  redirect('/')
}
