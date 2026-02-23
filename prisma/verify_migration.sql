-- Verificación de datos después de migración

-- Ver usuarios creados
SELECT * FROM `User`;

-- Ver solicitudes con sus usuarios vinculados
SELECT 
    mr.id,
    mr.requesterName,
    mr.userId,
    u.email,
    u.name,
    mr.totalItems,
    mr.isCompleted
FROM `MaterialRequest` mr
INNER JOIN `User` u ON mr.userId = u.id;

-- Contar solicitudes por usuario
SELECT 
    u.email,
    u.name,
    COUNT(mr.id) as total_solicitudes
FROM `User` u
LEFT JOIN `MaterialRequest` mr ON u.id = mr.userId
GROUP BY u.id, u.email, u.name;
