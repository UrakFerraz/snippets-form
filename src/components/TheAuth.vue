<template>
    <form class="row flex flex-center" @submit.prevent="checklogin">
        <div class="col-6 form-widget">
            <h1 class="header">Supabase + Vue 3</h1>
            <p class="description">
                Sign in via magic link with your email below
            </p>
            <input-line :label="'Email'">
                <input
                    class="inputField"
                    type="email"
                    placeholder="Your email"
                    v-model="email"
                />
            </input-line>
            <div>
                <input
                    type="submit"
                    class="button block"
                    :value="loading ? 'Loading' : 'Send magic link'"
                    :disabled="loading"
                />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useLogin } from '@/lib/supabase/login-handler-composable'
import InputLine from './InputLine.vue'
const { handleLogin, email, loading } = useLogin()
const checklogin = async () => {
    handleLogin()
}
</script>
