<template>
    <div class="login">
        <form @submit.prevent="signIn">
            <h1>Login</h1>

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
            <div class="login__actions">
                <button type="submit">Login</button>

                <router-link :to="{ name: 'register' }">
                    Don't have an account?
                    <span>Register</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import InputLine from './InputLine.vue'
import { useLogin } from '@/lib/supabase/login-handler-composable'
import { useRouter } from 'vue-router'
const { login, email, password } = useLogin()
const router = useRouter()
const signIn = async () => {
    await login()
    router.push({ name: 'profile' })
}
</script>

<style lang="scss" scoped>
.login {
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
