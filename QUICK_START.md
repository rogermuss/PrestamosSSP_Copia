# 🚀 Inicio Rápido - Sistema de Autenticación

## ⚠️ IMPORTANTE: Ejecutar ANTES de iniciar la aplicación

Los errores de TypeScript que ves actualmente son **normales y esperados**. Desaparecerán después de aplicar la migración.

---

## 📝 Pasos de Instalación

### 1️⃣ Asegúrate de que MySQL esté en ejecución

Verifica que tu servidor MySQL esté activo en `localhost:3306`

### 2️⃣ Aplica la migración de base de datos

```powershell
# Opción A: Migración automática (RECOMENDADO)
npx prisma migrate dev --name add_user_authentication

# Opción B: Reset completo (si tienes problemas)
npx prisma migrate reset
```

### 3️⃣ Regenera el cliente de Prisma

```powershell
npx prisma generate
```

### 4️⃣ Inicia la aplicación

```powershell
npm run dev
```

---

## ✅ Verificar que todo funciona

1. Abre tu navegador en `http://localhost:3000`
2. Deberías ser redirigido a `/login`
3. Ingresa:
   - **Email**: `estudiante1@universidad.edu`
   - **Nombre**: `Juan Pérez`
4. Click en "Iniciar Sesión con Google"
5. Deberías ver el sistema principal con tu nombre en el header

---

## 🐛 Solución de Problemas

### Error: "Can't reach database server"
```powershell
# Inicia tu servidor MySQL
# En XAMPP: Inicia el módulo MySQL
# En servicios de Windows: Inicia el servicio MySQL
```

### Error: "Property 'user' does not exist"
```powershell
# Ejecuta estos comandos en orden:
npx prisma generate
npm run dev
```

### Error al crear usuario
```powershell
# La tabla User no existe aún
# Ejecuta la migración primero:
npx prisma migrate dev --name add_user_authentication
```

---

## 📚 Documentación Completa

- `IMPLEMENTATION_SUMMARY.md` - Resumen completo de cambios
- `AUTHENTICATION_UPDATE.md` - Guía de actualización detallada

---

## 🎯 Características Implementadas

- ✅ Login simulado (preparado para Google OAuth)
- ✅ Protección de rutas con middleware
- ✅ Sesión persistente (7 días)
- ✅ Vinculación automática de solicitudes a usuarios
- ✅ Header con información de usuario
- ✅ Admin panel con datos de usuarios
- ✅ Logout funcional

---

## 💡 Usuarios de Prueba

Después de ejecutar el seed, estos usuarios estarán disponibles:

| Email | Nombre |
|-------|--------|
| estudiante1@universidad.edu | Juan Pérez |
| estudiante2@universidad.edu | María García |
| profesor@universidad.edu | Dr. Carlos López |

---

**¿Listo para comenzar?** Ejecuta los comandos de arriba y ¡empieza a usar el sistema! 🎉
