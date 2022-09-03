import { inputsStore } from '@/store/inputs'
import { storeToRefs } from 'pinia'
import { handleLogin, login } from '../lib/supabase/login-handler'
const storeInputs = inputsStore()
const { email, password } = storeToRefs(storeInputs)
import { userStore } from '@/store/user'
const store = userStore()
export function useLogin() {
    const loginFn = async () => {
        await login(email.value, password.value)
    }
    const handleLoginFn = async () => {
        await handleLogin(email.value, store.setLoading)
    }
    return { handleLoginFn, loginFn }
}
