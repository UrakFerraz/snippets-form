<template>
    <div className="container" style="padding: 50px 0 100px 0">
        <template v-if="session">
            <account :key="userId" :session="session" />
        </template>
        <template v-else><auth /></template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import account from '@/components/auth/TheAccount.vue'
import auth from '@/components/auth/TheAuth.vue'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

const session = ref<Session | null>(null)
onMounted(() => {
    session.value = supabase.auth.session()
    supabase.auth.onAuthStateChange(() => {
        session.value = supabase.auth.session()
        console.log(session.value)
    })
})

const userId = computed(() => {
    console.log(supabase)

    if (session.value === null) return
    if (session.value.user === null) return
    return session.value.user.id
})
</script>

<style></style>
