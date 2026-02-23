-- Script de limpieza y re-aplicación de migración
-- Ejecutar si hay problemas con migración parcialmente aplicada

-- 1. Eliminar constraint si existe
SET @exist_fk = (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS 
    WHERE CONSTRAINT_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'MaterialRequest' 
    AND CONSTRAINT_NAME = 'MaterialRequest_userId_fkey' 
    AND CONSTRAINT_TYPE = 'FOREIGN KEY');

SET @sqlstmt_fk = IF(@exist_fk > 0, 
    'ALTER TABLE `MaterialRequest` DROP FOREIGN KEY `MaterialRequest_userId_fkey`', 
    'SELECT ''FK does not exist''');
PREPARE stmt_fk FROM @sqlstmt_fk;
EXECUTE stmt_fk;

-- 2. Eliminar columna userId si existe
SET @exist_col = (SELECT COUNT(*) FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'MaterialRequest' 
    AND COLUMN_NAME = 'userId');

SET @sqlstmt_col = IF(@exist_col > 0, 
    'ALTER TABLE `MaterialRequest` DROP COLUMN `userId`', 
    'SELECT ''Column does not exist''');
PREPARE stmt_col FROM @sqlstmt_col;
EXECUTE stmt_col;

-- 3. Eliminar tabla User si existe
DROP TABLE IF EXISTS `User`;

-- 4. Eliminar índice si existe
SET @exist_idx = (SELECT COUNT(*) FROM information_schema.STATISTICS 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'MaterialRequest' 
    AND INDEX_NAME = 'MaterialRequest_userId_idx');

SET @sqlstmt_idx = IF(@exist_idx > 0, 
    'DROP INDEX `MaterialRequest_userId_idx` ON `MaterialRequest`', 
    'SELECT ''Index does not exist''');
PREPARE stmt_idx FROM @sqlstmt_idx;
EXECUTE stmt_idx;

SELECT 'Limpieza completada - Ahora ejecuta: npx prisma migrate resolve --rolled-back 20251205094552_add_user_authentication y luego npx prisma migrate deploy' AS mensaje;
