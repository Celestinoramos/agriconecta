import { USER_ROLES, UserRole, hasRole } from './roles'

/**
 * Permission definitions for the AgriConecta platform
 * 
 * This file defines what actions each role can perform.
 */

export interface PermissionCheck {
  userId?: string
  userRole: UserRole
}

/**
 * Check if user can access admin panel
 */
export function canAccessAdmin(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.STAFF)
}

/**
 * Check if user can view orders
 */
export function canViewOrders(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.STAFF)
}

/**
 * Check if user can update order status
 */
export function canUpdateOrderStatus(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.STAFF)
}

/**
 * Check if user can manage products (CRUD)
 */
export function canManageProducts(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Check if user can create products
 */
export function canCreateProducts(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Check if user can update products
 */
export function canUpdateProducts(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Check if user can delete products
 */
export function canDeleteProducts(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Check if user can manage users
 */
export function canManageUsers(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Check if user can change user roles
 */
export function canChangeUserRoles(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.SUPER_ADMIN)
}

/**
 * Check if user can manage admin accounts
 */
export function canManageAdmins(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.SUPER_ADMIN)
}

/**
 * Check if user can access system configurations
 */
export function canAccessConfigurations(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.SUPER_ADMIN)
}

/**
 * Check if user can manage categories
 */
export function canManageCategories(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Check if user can view analytics/dashboard
 */
export function canViewDashboard(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.STAFF)
}

/**
 * Check if user can export data
 */
export function canExportData(check: PermissionCheck): boolean {
  return hasRole(check.userRole, USER_ROLES.ADMIN)
}

/**
 * Helper to get all permissions for a role
 */
export function getRolePermissions(role: UserRole): string[] {
  const permissions: string[] = []
  const check: PermissionCheck = { userRole: role }

  if (canAccessAdmin(check)) permissions.push('access_admin')
  if (canViewOrders(check)) permissions.push('view_orders')
  if (canUpdateOrderStatus(check)) permissions.push('update_order_status')
  if (canManageProducts(check)) permissions.push('manage_products')
  if (canManageUsers(check)) permissions.push('manage_users')
  if (canChangeUserRoles(check)) permissions.push('change_user_roles')
  if (canManageAdmins(check)) permissions.push('manage_admins')
  if (canAccessConfigurations(check)) permissions.push('access_configurations')
  if (canManageCategories(check)) permissions.push('manage_categories')
  if (canViewDashboard(check)) permissions.push('view_dashboard')
  if (canExportData(check)) permissions.push('export_data')

  return permissions
}
