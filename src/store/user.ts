import { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

type AuthUserState = { session: Session | null; avatarURL: string }

export const userStore = defineStore('user', {
    state: (): AuthUserState => {
        return {
            session: null,
            avatarURL: '../assets/no_image_available.jpeg',
        }
    },
    getters: {
        getUser: (state) => state.session,
        getAvatarURL: (state) => state.avatarURL,
    },
    actions: {
        setAvatarURL(url: string) {
            this.avatarURL = url
        },
        setSession(session: Session) {
            this.session = session
        },
        setUser(user: User) {
            if (this.session === null) return
            this.session.user = user
        },
    },
})
