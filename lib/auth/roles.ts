/**
 * User Role Constants
 * 
 * This file defines the role hierarchy for the AgriConecta platform.
 * Roles are ordered from lowest to highest privilege level.
 */

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',       // Normal customer - can browse and purchase
  STAFF: 'STAFF',            // Staff member - can view and update orders
  ADMIN: 'ADMIN',            // Administrator - full CRUD access
  SUPER_ADMIN: 'SUPER_ADMIN' // Super Administrator - all permissions including admin management
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

/**
 * Role hierarchy for permission checking
 * Higher index = higher privilege
 */
const ROLE_HIERARCHY: UserRole[] = [
  USER_ROLES.CUSTOMER,
  USER_ROLES.STAFF,
  USER_ROLES.ADMIN,
  USER_ROLES.SUPER_ADMIN,
]

/**
 * Check if a role has at least the required permission level
 * @param userRole - The user's current role
 * @param requiredRole - The minimum required role
 * @returns true if user has sufficient permissions
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole)
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole)
  return userLevel >= requiredLevel
}

/**
 * Check if a role is valid
 * @param role - The role to check
 * @returns true if the role is valid
 */
export function isValidRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole)
}

/**
 * Get role display name in Portuguese
 * @param role - The role to get display name for
 * @returns The display name in Portuguese
 */
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    [USER_ROLES.CUSTOMER]: 'Cliente',
    [USER_ROLES.STAFF]: 'Funcionário',
    [USER_ROLES.ADMIN]: 'Administrador',
    [USER_ROLES.SUPER_ADMIN]: 'Super Administrador',
  }
  return displayNames[role] || 'Desconhecido'
}
