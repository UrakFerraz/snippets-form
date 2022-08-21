<template>
    <form class="form-widget" @submit.prevent="updateProfile">
        <input-line :label="'Email'">
            <input
                id="email"
                type="text"
                :value="
                    store.user && store.user.email
                        ? store.user.email
                        : 'email not loading'
                "
                disabled
            />
        </input-line>
        <input-line :label="'Name'">
            <input id="username" type="text" v-model="username" />
        </input-line>
        <input-line :label="'Website'">
            <input id="website" type="website" v-model="website" />
        </input-line>
        <div>
            <input
                type="submit"
                class="button block primary"
                :value="loading ? 'Loading ...' : 'Update'"
                :disabled="loading"
            />
        </div>
        <div>
            <button class="button block" @click="signOut" :disabled="loading">
                Sign Out
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
import { userStore } from '@/store/user'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

const store = userStore()

async function getProfile() {
    try {
        loading.value = true
        store.user = supabase.auth.user()
        if (store.user === null) {
            throw new Error('========== store.user === null ==========')
        }
        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', store.user.id)
            .single()

        if (error && status !== 406) throw error

        if (data) {
            username.value = data.username
            website.value = data.website
            avatar_url.value = data.avatar_url
        }
    } catch (e: unknown) {
        tryCatchError(e)
    } finally {
        loading.value = false
    }
}

async function updateProfile() {
    try {
        loading.value = true
        store.user = supabase.auth.user()
        if (store.user === null) {
            throw new Error('========== store.user === null ==========')
        }
        const updates = {
            id: store.user.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_url.value,
            updated_at: new Date(),
        }

        let { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
        })

        if (error) throw error
    } catch (e: unknown) {
        tryCatchError(e)
    } finally {
        loading.value = false
    }
}

async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (e: unknown) {
        tryCatchError(e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getProfile()
})
</script>
