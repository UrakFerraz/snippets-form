<template>
    <form class="row flex flex-center" @submit.prevent="checklogin">
        <div class="col-6 form-widget">
            <h1 class="header">Supabase + Vue 3</h1>
            <p class="description">
                Sign in via magic link with your email below
            </p>
            <div>
                <input
                    class="inputField"
                    type="email"
                    placeholder="Your email"
                    v-model="email"
                />
            </div>
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
import { ref } from 'vue'
import { handleLogin } from '@/lib/supabase/login-handler'

const loading = ref<boolean>(false)
const email = ref<string>('')

const checklogin = async () => {
    handleLogin(loading, email)
}
</script>
