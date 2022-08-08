import { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

type AuthUserState = { user: User | null; avatarURL: string }

export const userStore = defineStore('user', {
    state: (): AuthUserState => {
        return {
            user: null,
            avatarURL: '../assets/no_image_available.jpeg',
        }
    },
    getters: {
        mainState: (state) => state,
    },
    actions: {
        setAvatarURL(url: string) {
            this.avatarURL = url
        },
    },
})
