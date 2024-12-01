import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.account.createMany({
    data: [
      {
        accountId: 'account1',
        balance: 1000.00
      },
      {
        accountId: 'account2', 
        balance: 500.00
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })