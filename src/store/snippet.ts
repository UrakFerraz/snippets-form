import copyToClipboard from '@/modules/code-editor/copy-to-clipboard'
import { removeWhiteSpaces } from '@/modules/code-editor/remove-spaces'
import { defineStore } from 'pinia'

interface SnippetState {
    snippet: string
    language: string
    edited: string
}

export const snippetStore = defineStore('snippet', {
    state: (): SnippetState => {
        return {
            snippet: 'hello world',
            language: 'text',
            edited: 'hello world',
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        mainSnippet: (state) => state.snippet,
        mainLanguage: (state) => state.language,
        mainEdited: (state) => state.edited,
    },
    actions: {
        removeSpaces() {
            const filtered = removeWhiteSpaces(this.snippet)
            this.edited = filtered
        },
        copySnippet() {
            copyToClipboard(this.edited)
        },
        undoSnippet() {
            this.edited = this.snippet
        },
    },
})
