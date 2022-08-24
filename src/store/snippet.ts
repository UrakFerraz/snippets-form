import copyToClipboard from '@/modules/code-editor/copy-to-clipboard'
import { removeWhiteSpaces } from '@/modules/code-editor/remove-spaces'
import { defineStore } from 'pinia'

const defaultValues = {
    snippet: 'hello world',
    language: 'text',
    edited: 'hello world',
    title: 'hello world',
    tags: 'text',
}

interface SnippetState {
    snippet: string
    language: string
    edited: string
    title: string
    tags: string
}

export const snippetStore = defineStore('snippet', {
    state: (): SnippetState => {
        return {
            snippet: 'hello world',
            language: 'text',
            edited: 'hello world',
            title: 'hello world',
            tags: 'text',
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        mainState: (state) => state,
        mainSnippet: (state) => state.snippet,
        mainLanguage: (state) => state.language,
        mainEdited: (state) => state.edited,
        mainTitle: (state) => state.title,
        mainTags: (state) => state.tags,
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
        addSnippet(payload: string) {
            this.snippet = payload
        },
        addLanguage(payload: string) {
            this.language = payload
        },
        addEdited(payload: string) {
            this.edited = payload
        },
        addTags(payload: string) {
            this.tags = payload
        },
        addTitle(payload: string) {
            this.title = payload
        },
        clear() {
            this.title = defaultValues.title
            this.snippet = defaultValues.snippet
            this.language = defaultValues.language
            this.tags = defaultValues.tags
            this.edited = defaultValues.edited
        },
    },
})
