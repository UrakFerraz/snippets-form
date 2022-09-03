import { supabase } from '@/lib/supabaseClient'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'

const login = async (email: string | null, password: string | null) => {
    if (email !== null && password !== null)
        try {
            const { error } = await supabase.auth.signIn({
                email,
                password,
            })
            if (error) throw error
        } catch (e: unknown) {
            tryCatchError(e)
        }
}

const handleLogin = async (
    email: string | undefined,
    loadingCallback: (loading: boolean) => void
) => {
    try {
        loadingCallback(true)
        const { error } = await supabase.auth.signIn({
            email,
        })
        if (error) throw error
        alert('Check your email for the login link!')
    } catch (e: unknown) {
        tryCatchError(e)
    } finally {
        loadingCallback(false)
    }
}

export { login, handleLogin }
