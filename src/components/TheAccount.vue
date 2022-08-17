<template>
    <h1 class="profile-form__header">Supabase + Vue.js: Account</h1>
    <Avatar :url="avatar_url" @onUpload="handleImageUpload" />
    <div class="profile-form">
        <div>
            <label htmlFor="email">Email</label>
            <input
                v-if="session && session.user"
                id="email"
                type="text"
                :placeholder="session.user.email"
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
            <button class="button block" @click="profileSignOut()">
                Sign Out
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Avatar from './TheAvatar.vue'
import { useProfile } from '@/lib/supabase/profile-handler-composable'
import { Session } from '@supabase/supabase-js'

const props = defineProps<{ session: Session | null }>()

const {
    avatar_url,
    getProfile,
    handleImageUpload,
    loading,
    profileSignOut,
    updateProfile,
    username,
    website,
} = useProfile(props)

onMounted(() => {
    return getProfile()
})
</script>

<style scoped lang="scss">
@import '../assets/css/colors';
.profile-form {
    &__actions {
        margin-top: 30px;
        display: flex;
        gap: 50px;
        flex-direction: column;
        align-items: center;
    }
}

#email {
    &::placeholder {
        color: $darkest-color;
    }
}
</style>
