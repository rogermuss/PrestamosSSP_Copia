"use server"
import { clearSession } from "@/src/lib/session"
import { redirect } from "next/navigation"

export async function logoutAction() {
  await clearSession()
  redirect('/login')
}
