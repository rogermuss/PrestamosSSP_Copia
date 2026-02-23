-- Limpieza completa de cambios parciales de migración

-- 1. Eliminar foreign key si existe
SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE `MaterialRequest` DROP FOREIGN KEY IF EXISTS `MaterialRequest_userId_fkey`;

-- 2. Eliminar índice si existe  
ALTER TABLE `MaterialRequest` DROP INDEX IF EXISTS `MaterialRequest_userId_idx`;

-- 3. Eliminar columna userId si existe
ALTER TABLE `MaterialRequest` DROP COLUMN IF EXISTS `userId`;

-- 4. Eliminar tabla User si existe
DROP TABLE IF EXISTS `User`;

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'Limpieza completada exitosamente' AS Status;
