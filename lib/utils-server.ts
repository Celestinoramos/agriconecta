import { User } from '@prisma/client';

/**
 * Remove campos sensíveis do utilizador antes de retornar
 */
export function sanitizeUser(user: User): Omit<User, 'password'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userSemPassword } = user;
  return userSemPassword;
}
