import { defineStore } from 'pinia'

interface Snippet {
    id: number
    created_at: string
    snippet: string
    title: string
    tags: string
    user_id: string
    language: string
}

export const savedSnippetStore = defineStore('saved-snippet', {
    state: (): { savedSnippets: Snippet[] } => {
        return { savedSnippets: [] }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        mainSavedSnippetsState: (state) => state.savedSnippets,
    },
    actions: {
        addSnippet(payload: Snippet | Snippet[]) {
            Array.isArray(payload)
                ? this.savedSnippets.push(...payload)
                : this.savedSnippets.push(payload)
        },
    },
})
