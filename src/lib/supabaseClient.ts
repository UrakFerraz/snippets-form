import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

let supabase: SupabaseClient | null = null

if (typeof supabaseUrl === 'string' && typeof supabaseAnonKey === 'string') {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default supabase
