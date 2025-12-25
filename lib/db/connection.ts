import prisma from '@/lib/prisma'

/**
 * Check if the database connection is working
 * @returns Promise<boolean> - true if connected, false otherwise
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

/**
 * Execute a database operation with error handling
 * @param operation - The async operation to execute
 * @param fallback - Optional fallback value if operation fails
 * @returns Promise<T | null> - Result of operation or fallback/null
 */
export async function withDatabaseConnection<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | null> {
  try {
    return await operation()
  } catch (error) {
    console.error('Database operation failed:', error)
    if (fallback !== undefined) return fallback
    throw error
  }
}
