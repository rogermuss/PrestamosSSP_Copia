import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkMaterialValues() {
  const material = await prisma.material.findUnique({
    where: {
      name: 'BOBINA'
    }
  })
  
  console.log('Valores actuales en la base de datos:', material)
}

checkMaterialValues()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })