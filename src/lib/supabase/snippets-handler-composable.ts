import { supabase } from '../supabaseClient'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
const store = snippetStore()
import { inputsStore } from '@/store/inputs'
const storeInputs = inputsStore()
const { snippet, language, tags, title } = storeToRefs(store)
const languageInput = storeToRefs(storeInputs).language
const titleInput = storeToRefs(storeInputs).title
const tagsInput = storeToRefs(storeInputs).tags
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
import { ref } from 'vue'

type Snippet = {
    id: number
    created_at: string
    snippet: string
    title: string
    tags: string
    user_id: string
    language: string
}

const snippets = ref<Snippet[] | null>([])

export function useSnippet() {
    const createSnippet = async () => {
        try {
            const _user = supabase.auth.user()
            if (_user === null) {
                throw new Error('========== supabase.user === null ==========')
            }
            const { error } = await supabase.from('snippets').insert([
                {
                    user_id: _user.id,
                    title: title.value,
                    snippet: snippet.value,
                    language: language.value,
                    tags: tags.value,
                },
            ])
            if (error) throw error
        } catch (e: unknown) {
            tryCatchError(e)
        }
    }
    const saveSnippet = async () => {
        if (titleInput.value !== null)
            try {
                languageInput.value !== null &&
                    store.addLanguage(languageInput.value)
                tagsInput.value !== null && store.addTags(tagsInput.value)
                store.addTitle(titleInput.value)
                await createSnippet()
            } catch (e: unknown) {
                tryCatchError(e)
            }
    }
    const readSnippets = async () => {
        try {
            const _user = supabase.auth.user()
            if (_user === null) {
                throw new Error('========== supabase.user === null ==========')
            }
            const { data, error } = await supabase.from('snippets').select()
            if (error) throw error
            snippets.value = data
        } catch (e: unknown) {
            tryCatchError(e)
        }
    }
    return {
        saveSnippet,
        languageInput,
        titleInput,
        tagsInput,
        readSnippets,
        snippets,
    }
}
