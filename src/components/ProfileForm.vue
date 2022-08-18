<template>
    <div class="profile-form">
        <input-line :label="'Email'">
            <input
                v-if="session && session.user"
                type="text"
                :placeholder="session.user.email"
                disabled
            />
        </input-line>
        <input-line :label="'Name'">
            <input id="username" type="text" v-model="username" />
        </input-line>
        <input-line :label="'Website'">
            <input id="website" type="website" v-model="website" />
        </input-line>
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
import { toRefs } from 'vue'
import { Session } from '@supabase/supabase-js'
import InputLine from './InputLine.vue'
type Props = {
    session: Session | null
    username: string | null
    website: string | null
    loading: boolean
}
const props = defineProps<Props>()
const { session, username, website, loading } = toRefs(props)
const emit = defineEmits(['onUpdateProfile', 'onProfileSignOut'])
function updateProfile() {
    emit('onUpdateProfile')
}
function profileSignOut() {
    emit('onProfileSignOut')
}
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

input {
    &::placeholder {
        color: $darkest-color;
    }
}
</style>
