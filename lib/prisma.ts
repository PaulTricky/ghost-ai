import { PrismaPg } from "@prisma/adapter-pg"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Pool } from "pg"

import { PrismaClient } from "@/app/generated/prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pgPool: Pool | undefined
}

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL is not set")
  }
  return url
}

function createPrismaClient(): PrismaClient {
  const url = getDatabaseUrl()

  if (url.startsWith("prisma+postgres://")) {
    const client = new PrismaClient({
      accelerateUrl: url,
    }).$extends(withAccelerate())
    return client as unknown as PrismaClient
  }

  const pool =
    globalForPrisma.pgPool ??
    new Pool({
      connectionString: url,
    })
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool
  }

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
