/*
  Warnings:

  - Added the required column `userId` to the `MaterialRequest` table without a default value. This is not possible if the table is not empty.

*/

-- Paso 1: Crear la tabla User primero
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Paso 2: Insertar un usuario predeterminado para las solicitudes existentes
INSERT INTO `User` (`id`, `email`, `name`, `createdAt`) 
VALUES (1, 'sistema@universidad.edu', 'Usuario del Sistema', NOW());

-- Paso 3: Agregar la columna userId con valor predeterminado temporal
ALTER TABLE `MaterialRequest` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1;

-- Paso 4: Crear el índice
CREATE INDEX `MaterialRequest_userId_idx` ON `MaterialRequest`(`userId`);

-- Paso 5: Agregar la clave foránea
ALTER TABLE `MaterialRequest` ADD CONSTRAINT `MaterialRequest_userId_fkey` 
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Paso 6: Insertar usuarios de ejemplo para desarrollo
INSERT INTO `User` (`email`, `name`) VALUES 
    ('estudiante1@universidad.edu', 'Juan Pérez'),
    ('estudiante2@universidad.edu', 'María García'),
    ('profesor@universidad.edu', 'Dr. Carlos López');
