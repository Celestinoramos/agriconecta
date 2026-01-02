# Admin Authentication System

This document describes the static admin authentication system implemented for AgriConecta.

## Overview

A standalone admin authentication system has been implemented using cookie-based sessions, separate from the main Supabase authentication used for customers.

## Features

- **Static Admin User**: Pre-configured SUPER_ADMIN account
- **Cookie-based Sessions**: HttpOnly cookies for security
- **Role-based Access Control**: ADMIN and SUPER_ADMIN roles supported
- **Protected Routes**: Middleware automatically protects all `/admin/*` routes
- **Clean UI**: Admin login page without site header/footer
- **Bcrypt Password Hashing**: Secure password storage with 12 rounds

## Setup Instructions

After deploying the code, run the following command to create the admin user:

```bash
npm run db:seed-admin
```

This will create or update the admin user with:
- **Email**: `admin@agriconecta.com`
- **Password**: `Test0102`
- **Role**: `SUPER_ADMIN`

## Login

1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: `admin@agriconecta.com`
   - Password: `Test0102`
3. Click "Entrar"
4. You will be redirected to `/admin` (dashboard)

## Logout

Click the "Sair" button in the sidebar. This will:
1. Call the `/api/auth/admin-logout` endpoint
2. Clear the admin session cookie
3. Redirect to `/admin/login`

## Security

- Passwords are hashed using bcrypt with 12 rounds
- Sessions are stored in HttpOnly cookies (not accessible via JavaScript)
- Session duration: 24 hours
- Middleware validates session on every request to admin routes
- Only users with ADMIN or SUPER_ADMIN role can access admin area

## Architecture

### Files Created

- `prisma/seed-admin.ts` - Database seed script for admin user
- `lib/auth/admin-session.ts` - Session management utilities
- `app/api/auth/admin-login/route.ts` - Login API endpoint
- `app/api/auth/admin-logout/route.ts` - Logout API endpoint
- `app/admin/login/page.tsx` - Admin login page
- `app/admin/login/layout.tsx` - Minimal layout for login

### Files Modified

- `package.json` - Added `db:seed-admin` script
- `app/admin/layout.tsx` - Removed site header/footer
- `components/admin/Sidebar.tsx` - Updated logout functionality
- `middleware.ts` - Added admin route protection

## API Endpoints

### POST /api/auth/admin-login

Authenticates an admin user.

**Request Body:**
```json
{
  "email": "admin@agriconecta.com",
  "password": "Test0102"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "admin@agriconecta.com",
    "nome": "Administrador",
    "role": "SUPER_ADMIN"
  }
}
```

**Response (Error):**
```json
{
  "error": "Email ou palavra-passe incorretos"
}
```

### POST /api/auth/admin-logout

Logs out the current admin user.

**Response:**
```json
{
  "success": true
}
```

## Changing Admin Password

To change the admin password:

1. Update the `adminPassword` variable in `prisma/seed-admin.ts`
2. Run `npm run db:seed-admin`
3. The user will be updated with the new password hash

## Adding More Admin Users

You can manually add more admin users via the database or by creating additional seed scripts. Ensure:
- Password is hashed with bcrypt (12 rounds minimum)
- Role is set to either `ADMIN` or `SUPER_ADMIN`
- Email is verified (`emailVerified` field set to current timestamp)

## Troubleshooting

### Cannot access admin area
- Ensure you are logged in via `/admin/login`
- Check that cookies are enabled in your browser
- Verify the session cookie exists in browser dev tools

### Login fails
- Verify admin user exists in database
- Check console logs for error messages
- Ensure database connection is working

### Session expires quickly
- Default session duration is 24 hours
- Adjust `ADMIN_SESSION_DURATION_SECONDS` in `app/api/auth/admin-login/route.ts` if needed
