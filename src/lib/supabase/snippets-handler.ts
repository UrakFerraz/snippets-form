import { supabase } from '../supabaseClient'
import { tryCatchError, typeError } from '@/modules/ErrorHandler/typeError'

interface SavedSnippet {
    id: number
    created_at: string
    snippet: string
    title: string
    tags: string
    user_id: string
    language: string
}

interface EditedSnippet {
    snippet: string
    title: string
    tags: string
    language: string
}

const createSnippet = async (snippet: EditedSnippet) => {
    try {
        const _user = supabase.auth.user()
        if (_user === null) {
            return typeError('supabase.user === null')
        }
        const { error } = await supabase.from('snippets').insert([
            {
                user_id: _user.id,
                title: snippet.title,
                snippet: snippet.snippet,
                language: snippet.language,
                tags: snippet.tags,
            },
        ])
        if (error) throw error
    } catch (e: unknown) {
        tryCatchError(e)
    }
}

const saveSnippet = async (snippet: EditedSnippet, callbackFn: () => void) => {
    try {
        await callbackFn()
    } catch (e: unknown) {
        tryCatchError(e)
    }
}

const readSnippets = async (
    callbackFn: (snippet: SavedSnippet[]) => void,
    isLoaded: boolean
) => {
    if (!isLoaded)
        try {
            console.log('entrou')
            const _user = supabase.auth.user()
            if (_user === null) {
                return typeError('supabase.user === null')
            }
            const { data, error } = await supabase.from('snippets').select()
            if (error) throw error
            const res = data as SavedSnippet[]
            callbackFn(res)
        } catch (e: unknown) {
            tryCatchError(e)
        }
}

export { createSnippet, saveSnippet, readSnippets }
