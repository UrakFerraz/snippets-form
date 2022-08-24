<template>
    <div class="save">
        <!-- Error Handling -->
        <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
        </div>

        <!-- Save -->
        <form @submit.prevent="saveSnippet">
            <h1>Save snippet</h1>
            <input-line :label="'Title'">
                <input type="text" required v-model="title" />
            </input-line>
            <input-line :label="'Language'">
                <input type="text" v-model="language" />
            </input-line>
            <input-line :label="'Tags'">
                <input type="text" v-model="tags" />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
import { createSnippet } from '@/lib/supabase/snippets-handler'
import InputLine from './InputLine.vue'
import { snippetStore } from '@/store/snippet'
const store = snippetStore()

const router = useRouter()
const language = ref<string | null>(null)
const title = ref<string | null>(null)
const tags = ref<string | null>(null)
const errorMsg = ref(null)

const saveSnippet = async () => {
    if (title.value !== null)
        try {
            language.value !== null && store.addLanguage(language.value)
            tags.value !== null && store.addTags(tags.value)
            store.addTitle(title.value)
            await createSnippet()
            router.push({ name: 'snippets-form' })
        } catch (e: unknown) {
            tryCatchError(e)
        }
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
