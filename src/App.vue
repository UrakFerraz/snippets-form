<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/snippets-form">Snippets Form</router-link> |
        <router-link to="/snippets-list">Snippets List</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/profile">Profile</router-link> |
    </nav>
    <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from './lib/supabaseClient'
import { userStore } from '@/store/user'
const store = userStore()
const appReady = ref<boolean | null>(null)

const user = supabase.auth.user()

supabase.auth.onAuthStateChange((_, session) => {
    session !== null && session.user && store.setUser(session.user)
    appReady.value = true
})

if (!user) {
    appReady.value = true
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: $gray;
        margin: 10px;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
