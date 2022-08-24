<template>
    <div class="login">
        <!-- Error Handling -->
        <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
        </div>

        <!-- Login -->
        <form @submit.prevent="login">
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
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'
import InputLine from './InputLine.vue'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'

const router = useRouter()
const email = ref(null)
const password = ref(null)
const errorMsg = ref(null)
const login = async () => {
    if (email.value !== null && password.value !== null)
        try {
            const { error } = await supabase.auth.signIn({
                email: email.value,
                password: password.value,
            })
            if (error) throw error
            router.push({ name: 'profile' })
        } catch (e: unknown) {
            tryCatchError(e)
        }
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
