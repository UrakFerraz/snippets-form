import { defineStore } from 'pinia'

interface SnippetState {
    snippet: string
    language: string
}

export const snippetStore = defineStore('snippet', {
    state: (): SnippetState => {
        return {
            snippet: 'hello world',
            language: 'text',
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        mainSnippet: (state) => state.snippet + 'getter snippet',
    },
    actions: {
        filter(snippetPasted: (code: string) => string) {
            this.snippet = snippetPasted(this.snippet)
        },
    },
})
