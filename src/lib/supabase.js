import { createClient } from '@supabase/supabase-js'

// mobiWEB y mobiOS deben utilizar SIEMPRE el mismo proyecto compartido.
// La configuración pública del proyecto queda fijada aquí para evitar que
// una variable VITE_* diferente en el hosting de mobifixes.com apunte a otro
// proyecto y haga que las OT no aparezcan en la web pública.
const SUPABASE_URL = 'https://zigfyuhhhigngxrolhlc.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_fFrr6FScBhOG_zUChELoGw_hmoZ50gk'

export const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export const createSupabaseClient = () => {
  if (!hasSupabaseConfig) {
    console.error('Supabase no está configurado. URL usada:', SUPABASE_URL)
    return null
  }

  console.log('Supabase URL usada:', SUPABASE_URL)

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
