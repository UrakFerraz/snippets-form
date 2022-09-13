import { supabase } from '../supabaseClient'
import { editedSnippetStore } from '@/store/snippet/edited'
import { savedSnippetStore } from '@/store/snippet/saved'
import { storeToRefs } from 'pinia'
const editedStore = editedSnippetStore()
const savedStore = savedSnippetStore()
import { inputsStore } from '@/store/inputs'
const storeInputs = inputsStore()
const { snippet, language, tags, title } = storeToRefs(editedStore)
const languageInput = storeToRefs(storeInputs).language
const titleInput = storeToRefs(storeInputs).title
const tagsInput = storeToRefs(storeInputs).tags
import { tryCatchError } from '@/modules/ErrorHandler/typeError'

interface Snippet {
    id: number
    created_at: string
    snippet: string
    title: string
    tags: string
    user_id: string
    language: string
}

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
                    editedStore.addLanguage(languageInput.value)
                tagsInput.value !== null && editedStore.addTags(tagsInput.value)
                editedStore.addTitle(titleInput.value)
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
            const res = data as Snippet[]
            savedStore.addSnippet(res)
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
    }
}
