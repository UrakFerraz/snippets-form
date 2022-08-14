import { Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'

type Loading = Ref<boolean>
type Email = Ref<string>

const handleLogin = async (loading: Loading, email: Email) => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signIn({
            email: email.value,
        })
        if (error) throw error
        alert('Check your email for the login link!')
    } catch (e: unknown) {
        tryCatchError(e)
    } finally {
        loading.value = false
    }
}

export { handleLogin }
