import { Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'

type Loading = Ref<boolean>
type Email = Ref<string | undefined>

const email: Email = ref(undefined)
const password = ref(null)
const loading: Loading = ref<boolean>(false)

export function useLogin() {
    const login = async () => {
        if (email.value !== null && password.value !== null)
            try {
                const { error } = await supabase.auth.signIn({
                    email: email.value,
                    password: password.value,
                })
                if (error) throw error
            } catch (e: unknown) {
                tryCatchError(e)
            }
    }
    const handleLogin = async () => {
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
    return { handleLogin, login, email, password, loading }
}
