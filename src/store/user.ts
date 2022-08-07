import { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

type AuthUserState = { user: User | null }

export const userStore = defineStore('user', {
    state: (): AuthUserState => {
        return {
            user: null,
        }
    },
    getters: {
        mainUser: (state) => state.user,
    },
})
