import { supabase } from '../supabaseClient'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
const store = snippetStore()
const { snippet, language, tags, title } = storeToRefs(store)

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

export { createSnippet }
