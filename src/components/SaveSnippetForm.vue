<template>
    <div class="save">
        <form @submit.prevent="saveSnippetOnDatabase">
            <h1>Save snippet</h1>
            <input-line :label="'Title'">
                <input type="text" required v-model="titleInput" />
            </input-line>
            <input-line :label="'Language'">
                <input type="text" v-model="languageInput" />
            </input-line>
            <input-line :label="'Tags'">
                <input type="text" v-model="tagsInput" />
            </input-line>
            <div class="save__actions">
                <button type="submit">Save</button>

                <router-link :to="{ name: 'register' }">
                    Don't have an account?
                    <span>Register</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSnippet } from '@/lib/supabase/snippets-handler-composable'
import InputLine from './InputLine.vue'
const { saveSnippet, languageInput, titleInput, tagsInput } = useSnippet()
const router = useRouter()
const saveSnippetOnDatabase = async () => {
    await saveSnippet()
    router.push({ name: 'snippets-form' })
}
</script>

<style lang="scss" scoped>
.save {
    margin-block: 20px;
    &__actions {
        margin-block: 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        align-items: center;
    }
}
</style>
