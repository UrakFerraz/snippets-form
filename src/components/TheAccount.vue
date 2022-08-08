<template>
    <div class="profile-form">
        <h1 class="profile-form__header">Supabase + Vue.js: Account</h1>
        <avatar :url="avatar_url" @onUpload="handleImageUpload" />
        <div>
            <label htmlFor="email">Email</label>
            <input
                v-if="session && session.user"
                id="email"
                type="text"
                :value="session.user.email"
                disabled
            />
        </div>
        <div>
            <label htmlFor="username">Name</label>
            <input id="username" type="text" v-model="username" />
        </div>
        <div>
            <label htmlFor="website">Website</label>
            <input id="website" type="website" v-model="website" />
        </div>
        <div class="profile-form__actions">
            <button
                class="button block primary"
                @click="updateProfile()"
                :disabled="loading"
            >
                <span>{{ loading ? 'Loading...' : 'Update' }}</span>
            </button>
            <button class="button block" @click="supabase.auth.signOut()">
                Sign Out
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Avatar from './TheAvatar.vue'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

const props = defineProps<{ session: Session | null }>()

const loading = ref(false)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

const handleImageUpload = async (path: string) => {
    avatar_url.value = path
    await updateProfile()
}

const updateProfile = async () => {
    try {
        // eslint-disable-next-line no-debugger
        debugger
        loading.value = true
        const user = supabase.auth.user()

        if (user === null)
            throw new Error('========== user === null ==========')

        const updates = {
            id: user.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_url.value || avatar_url,
            updated_at: new Date(),
        }

        let { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
        })

        if (error) {
            throw error
        }
    } catch (e: unknown) {
        if (typeof e === 'string') {
            e.toUpperCase()
        } else if (e instanceof Error) {
            e.message
        }
    } finally {
        loading.value = false
    }
}

const getProfile = async () => {
    if (props.session === undefined)
        throw new Error('========== session === undefined ==========')
    try {
        loading.value = true
        if (props.session === null)
            throw new Error('========== session.user === undefined ==========')
        const user = props.session.user

        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user?.id)
            .single()

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            username.value = data.username
            website.value = data.website
            avatar_url.value = data.avatar_url
        }

        // eslint-disable-next-line no-debugger
        debugger
    } catch (e: unknown) {
        if (typeof e === 'string') {
            e.toUpperCase()
        } else if (e instanceof Error) {
            e.message
        }
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    return getProfile()
})
</script>

<style scoped lang="scss">
.profile-form {
    &__actions {
        margin-top: 30px;
        display: flex;
        gap: 50px;
        flex-direction: column;
        align-items: center;
    }
}
</style>
