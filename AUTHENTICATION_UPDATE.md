# Actualización del Sistema de Autenticación

## Cambios Implementados

Se ha implementado un sistema de autenticación simulado que replica el funcionamiento futuro de Google OAuth con cuentas universitarias. Los cambios principales incluyen:

### 1. Base de Datos
- **Nuevo modelo `User`**: Almacena información de usuarios (email, nombre)
- **Actualización de `MaterialRequest`**: Ahora incluye `userId` para vincular solicitudes con usuarios

### 2. Funcionalidades Nuevas
- **Página de Login** (`/login`): Simula inicio de sesión con email universitario
- **Gestión de Sesión**: Cookies seguras para mantener sesión activa
- **Middleware**: Protege rutas y redirige usuarios no autenticados
- **Header de Usuario**: Muestra información del usuario y botón de logout

### 3. Vistas Actualizadas
- **Vista de Solicitudes**: Muestra email del usuario que realizó la solicitud
- **Vista de Admin**: Incluye información completa del usuario (ID, email, nombre)

## Pasos para Aplicar los Cambios

### 1. Generar y Aplicar la Migración

```powershell
# Generar la migración basada en los cambios del schema
npx prisma migrate dev --name add_user_model

# Si ya tienes datos y prefieres hacer push sin migración:
# npx prisma db push
```

### 2. Regenerar el Cliente de Prisma

```powershell
npx prisma generate
```

### 3. (Opcional) Ejecutar el Seed con Usuarios de Ejemplo

```powershell
# Si quieres resetear la base de datos y agregar usuarios de ejemplo
npx prisma migrate reset

# Esto ejecutará automáticamente el seed.ts que ahora incluye usuarios
```

## Usuarios de Ejemplo Incluidos en el Seed

- **estudiante1@universidad.edu** - Juan Pérez
- **estudiante2@universidad.edu** - María García  
- **profesor@universidad.edu** - Dr. Carlos López

## Cómo Usar el Sistema

1. **Iniciar la Aplicación**:
   ```powershell
   npm run dev
   ```

2. **Login**: Al acceder, serás redirigido a `/login`
   - Ingresa un email que termine en `@universidad.edu`
   - Ingresa tu nombre completo
   - Click en "Iniciar Sesión con Google"

3. **Navegar**: Una vez autenticado, podrás:
   - Ver tu información en el header superior
   - Realizar solicitudes de materiales (vinculadas a tu cuenta)
   - Ver el historial de solicitudes completadas
   - Cerrar sesión cuando desees

4. **Vista de Admin** (`/admin`):
   - Muestra todas las solicitudes pendientes
   - Incluye información del usuario que realizó cada solicitud
   - Permite marcar solicitudes como completadas

## Estructura de Archivos Nuevos

```
actions/
  login-action.ts              # Acción para login
  logout-action.ts             # Acción para logout

app/
  login/
    page.tsx                   # Página de login simulado

components/
  ui/
    UserHeader.tsx             # Header con info de usuario

src/
  lib/
    session.ts                 # Utilidades de gestión de sesión

middleware.ts                  # Protección de rutas
```

## Notas Importantes

- **Simulación**: Este sistema simula el login. En producción se usará Google OAuth real
- **Email Universitario**: Solo acepta emails que terminen en `@universidad.edu`
- **Sesión Persistente**: La sesión dura 7 días por defecto
- **Seguridad**: Las cookies son httpOnly y secure en producción

## Migración a Google OAuth en Producción

Para la versión final con Google OAuth:

1. Instalar `next-auth` o similar:
   ```powershell
   npm install next-auth @auth/prisma-adapter
   ```

2. Configurar Google Cloud Console:
   - Crear proyecto OAuth
   - Obtener Client ID y Client Secret
   - Configurar dominio `universidad.edu` como permitido

3. Actualizar el código para usar el provider real en lugar del simulado

La estructura actual está diseñada para facilitar esta migración manteniendo la misma lógica de sesiones y vinculación de solicitudes.
