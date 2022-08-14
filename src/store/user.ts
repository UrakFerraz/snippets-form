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
        getUser: (state) => state.user,
        getAvatarURL: (state) => state.avatarURL,
    },
    actions: {
        setAvatarURL(url: string) {
            this.avatarURL = url
        },
        setUser(user: User) {
            this.user = user
        },
    },
})
