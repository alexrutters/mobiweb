import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

export const createSupabaseClient = () => {
  if (!hasSupabaseConfig) {
    console.error('Supabase URL no configurada o inválida. URL usada:', supabaseUrl)
    return null
  }

  console.log('Supabase URL usada:', supabaseUrl)

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
