import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

export const supabase: SupabaseClient = createClient(
    supabaseUrl as string,
    supabaseAnonKey as string
)
