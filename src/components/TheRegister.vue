<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Error Handling -->
        <div
            v-if="errorMsg"
            class="mb-10 p-4 rounded-md bg-light-grey shadow-lg"
        >
            <p class="text-red-500">{{ errorMsg }}</p>
        </div>

        <!-- Register -->
        <form
            @submit.prevent="register"
            class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
        >
            <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

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

            <button
                type="submit"
                class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
            >
                Register
            </button>

            <router-link
                class="text-sm mt-6 text-center"
                :to="{ name: 'Login' }"
            >
                Already have an account?
                <span class="text-at-light-green">Login</span>
            </router-link>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
            router.push({ name: 'Login' })
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
