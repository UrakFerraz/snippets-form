<template>
    <div class="save">
        <form @submit.prevent="saveSnippetOnDatabase">
            <h1>Save snippet</h1>
            <InputLine :label="'Title'" :type="'text'" :is-required="true" />
            <InputLine :label="'Language'" :type="'text'" />
            <InputLine :label="'Tags'" :type="'text'" />
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
import InputLine from '@/components/InputLine.vue'
import { onMounted } from 'vue'
const { saveSnippet, readSnippets } = useSnippet()
const router = useRouter()
const saveSnippetOnDatabase = async () => {
    await saveSnippet()
    router.push({ name: 'snippets-form' })
}

onMounted(async () => readSnippets())
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
