import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Admin Client
 * 
 * This client uses the service role key and should ONLY be used in server-side code.
 * The service role key bypasses Row Level Security (RLS) policies.
 * 
 * NEVER expose this client or the service role key to the browser/client-side.
 */
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
    )
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
