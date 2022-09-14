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

interface SavedSnippetStore {
    savedSnippets: Snippet[]
    isLoaded: boolean
}

export const savedSnippetStore = defineStore('saved-snippet', {
    state: (): SavedSnippetStore => {
        return { savedSnippets: [], isLoaded: false }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        mainSavedSnippetsState: (state) => state.savedSnippets,
        mainIsLoadedState: (state) => state.isLoaded,
    },
    actions: {
        addSnippet(payload: Snippet | Snippet[]) {
            this.savedSnippets = []
            Array.isArray(payload)
                ? this.savedSnippets.push(...payload)
                : this.savedSnippets.push(payload)
            this.setIsLoaded(true)
        },
        setIsLoaded(payload: boolean) {
            this.isLoaded = payload
        },
    },
})
