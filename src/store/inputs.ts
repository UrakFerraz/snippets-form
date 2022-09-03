import { defineStore } from 'pinia'

type Inputs = {
    username: string
    email: string
    website: string
    title: string
    tags: string
    language: string
    password: string
    confirmPassword: string
}

export const inputsStore = defineStore('Inputs', {
    state: (): Inputs => {
        return {
            username: '',
            email: '',
            website: '',
            title: '',
            tags: '',
            language: '',
            password: '',
            confirmPassword: '',
        }
    },
    getters: {
        getMain: (state) => state,
    },
    actions: {
        setUsername(payload: string) {
            this.username = payload
        },
        setEmail(payload: string) {
            this.email = payload
        },
        setWebsite(payload: string) {
            this.website = payload
        },
        setTitle(payload: string) {
            this.title = payload
        },
        setTags(payload: string) {
            this.tags = payload
        },
        setLanguage(payload: string) {
            this.language = payload
        },
        setPassword(payload: string) {
            this.password = payload
        },
        setConfirmPassword(payload: string) {
            this.confirmPassword = payload
        },
    },
})
