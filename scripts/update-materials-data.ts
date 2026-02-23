import fs from 'fs';
import path from 'path';

const materialsPath = path.join(__dirname, '..', 'prisma', 'data', 'materials.ts');
const materialsContent = fs.readFileSync(materialsPath, 'utf-8');

// Convertir el contenido del archivo a un string que podamos manipular
let updatedContent = materialsContent;

// Buscar todas las ocurrencias de objetos de material y agregar totalStock
const regex = /{\s*name:\s*"([^"]+)",\s*stock:\s*(\d+),\s*image:/g;
updatedContent = updatedContent.replace(regex, (match, name, stock) => {
    return `{ name: "${name}", stock: ${stock}, totalStock: ${stock}, image:`;
});

// Escribir el contenido actualizado de vuelta al archivo
fs.writeFileSync(materialsPath, updatedContent);

console.log('Archivo materials.ts actualizado correctamente.');