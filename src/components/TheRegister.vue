<template>
    <div class="register">
        <!-- Error Handling -->
        <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
        </div>

        <!-- Register -->
        <form @submit.prevent="register">
            <h1>Register</h1>
            <InputLine :label="'Email'" :type="'text'" :is-required="true" />
            <InputLine
                :label="'Password'"
                :type="'password'"
                :is-required="true"
            />
            <InputLine
                :label="'Confirm Password'"
                :type="'password'"
                :is-required="true"
            />
            <div class="register__actions">
                <button type="submit">Register</button>
                <router-link :to="{ name: 'login' }">
                    Already have an account?
                    <span>Login</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputLine from './InputLine.vue'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
import { inputsStore } from '@/store/inputs'
import { storeToRefs } from 'pinia'
const store = inputsStore()
const { email, password, confirmPassword } = storeToRefs(store)
const router = useRouter()
const errorMsg = ref<string | null>(null)

const register = async () => {
    if (
        password.value === confirmPassword.value &&
        email.value !== null &&
        password.value !== null
    ) {
        try {
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
            })
            if (error) throw error
            router.push({ name: 'login' })
        } catch (e: unknown) {
            tryCatchError(e)
        }
        return
    }
    errorMsg.value = 'Error: Passwords do not match'
    setTimeout(() => {
        errorMsg.value = null
    }, 5000)
}
</script>

<style lang="scss" scoped>
.register {
    margin-block: 20px;
    &__actions {
        margin-block: 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        align-items: center;
    }
}
</style>
