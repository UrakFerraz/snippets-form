import { editedSnippetStore } from '@/store/snippet/edited'
import { savedSnippetStore } from '@/store/snippet/saved'
import { storeToRefs } from 'pinia'
const editedStore = editedSnippetStore()
const savedStore = savedSnippetStore()
import { inputsStore } from '@/store/inputs'
const storeInputs = inputsStore()
const { snippet, language, tags, title, isSaved } = storeToRefs(editedStore)
const languageInput = storeToRefs(storeInputs).language
const titleInput = storeToRefs(storeInputs).title
const tagsInput = storeToRefs(storeInputs).tags
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
import {
    createSnippet,
    readSnippets,
    saveSnippet,
} from '@/lib/supabase/snippets-handler'

export function useSnippet() {
    const createSnippetFn = async () => {
        console.log(isSaved !== undefined && !isSaved.value)
        if (isSaved !== undefined && !isSaved.value)
            return await createSnippet({
                snippet: snippet.value,
                language: language.value,
                tags: tags.value,
                title: title.value,
            })
    }
    function saveSnippetCallback() {
        if (titleInput.value !== null)
            try {
                languageInput.value !== null &&
                    editedStore.addLanguage(languageInput.value)
                tagsInput.value !== null && editedStore.addTags(tagsInput.value)
                editedStore.addTitle(titleInput.value)
                createSnippetFn()
                editedStore.setIsSaved(true)
                console.log(editedStore)
            } catch (e: unknown) {
                tryCatchError(e)
            }
    }
    const saveSnippetFn = async () => {
        savedStore.setIsLoaded(false)
        return await saveSnippet(
            {
                snippet: snippet.value,
                language: language.value,
                tags: tags.value,
                title: title.value,
            },
            saveSnippetCallback
        )
    }
    const readSnippetsFn = async () => {
        editedStore.setIsSaved(false)
        return await readSnippets(
            savedStore.addSnippet,
            savedStore.mainIsLoadedState
        )
    }
    return {
        saveSnippet,
        languageInput,
        titleInput,
        tagsInput,
        readSnippets,
        saveSnippetFn,
        readSnippetsFn,
    }
}
