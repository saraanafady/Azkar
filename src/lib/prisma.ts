import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with error handling
let prisma: PrismaClient

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['error'],
  })
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
} catch (error) {
  console.warn('Prisma client initialization failed, using mock data instead:', error)
  // Create a mock prisma client that returns empty results
  prisma = {
    azkarCategory: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
    },
    user: {
      findUnique: () => Promise.resolve(null),
      create: () => Promise.resolve({}),
    },
    azkar: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
    },
    azkarProgress: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
    },
    tasbihCount: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve({}),
    },
    bookmark: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve({}),
      delete: () => Promise.resolve({}),
    },
  } as any
}

export { prisma }
