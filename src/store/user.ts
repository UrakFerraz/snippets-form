import { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import avatarFallback from '@/assets/avatar-fallback'
type AuthUserState = {
    session: Session | null
    avatarURL: string
    loading: boolean
    password: string
    avatarIsUploaded: boolean
}

export const userStore = defineStore('user', {
    state: (): AuthUserState => {
        return {
            session: null,
            avatarURL: avatarFallback,
            loading: false,
            password: '',
            avatarIsUploaded: false
        }
    },
    getters: {
        getUser: (state) => state.session,
        getAvatarURL: (state) => state.avatarURL,
        avatarIsUploaded: (state) => state.avatarIsUploaded,
    },
    actions: {
        setAvatarURL(url: string) {
            this.avatarURL = url
        },
        setAvatarIsUploaded(isLoaded: boolean) {
            this.avatarIsUploaded = isLoaded
        },
        setSession(session: Session) {
            this.session = session
        },
        setUser(user: User) {
            if (this.session === null) return
            this.session.user = user
        },
        setLoading(loading: boolean) {
            this.loading = loading
        },
        setPassword(password: string) {
            this.password = password
        },
    },
})
