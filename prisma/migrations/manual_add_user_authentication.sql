-- CreateTable User and Update MaterialRequest
-- Esta migración agrega el modelo User y la relación con MaterialRequest

-- Crear tabla User
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Agregar columna userId a MaterialRequest
ALTER TABLE `MaterialRequest` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1;

-- Crear índice para userId
CREATE INDEX `MaterialRequest_userId_idx` ON `MaterialRequest`(`userId`);

-- Agregar foreign key constraint
ALTER TABLE `MaterialRequest` ADD CONSTRAINT `MaterialRequest_userId_fkey` 
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insertar usuarios de ejemplo (opcional, para testing)
INSERT INTO `User` (`email`, `name`) VALUES 
    ('estudiante1@universidad.edu', 'Juan Pérez'),
    ('estudiante2@universidad.edu', 'María García'),
    ('profesor@universidad.edu', 'Dr. Carlos López');
