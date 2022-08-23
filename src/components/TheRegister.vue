<template>
    <div class="register">
        <!-- Error Handling -->
        <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
        </div>

        <!-- Register -->
        <form @submit.prevent="register">
            <h1>Register</h1>

            <input-line :label="'Email'">
                <input type="text" required id="email" v-model="email" />
            </input-line>
            <input-line :label="'Password'">
                <input
                    type="password"
                    required
                    id="password"
                    v-model="password"
                />
            </input-line>
            <input-line :label="'Confirm Password'">
                <input
                    type="password"
                    required
                    id="confirmPassword"
                    v-model="confirmPassword"
                />
            </input-line>
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

const router = useRouter()
const email = ref<string | null>(null)
const password = ref<string | null>(null)
const confirmPassword = ref<string | null>(null)
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
