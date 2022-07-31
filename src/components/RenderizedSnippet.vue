<template>
    <div>
        <button @click="removeSpaces()" class="filter-btn">
            Remover tabulação e quebras de linha
        </button>
        <div className="Code">
            <pre
                :class="`language-${language}`"
                v-html="codeContentToHTML"
            ></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { removeWhiteSpaces } from '@/modules/code-editor/remove-spaces'
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { computed, ref } from 'vue'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'

const store = snippetStore()
const { snippet, language } = storeToRefs(store)
const removeSpacesFilter = ref<boolean>(false)
const codeContentToHTML = computed(() => {
    const content = highlightedCodeElement(snippet.value, language.value)
    if (removeSpacesFilter.value) {
        return removeWhiteSpaces(content)
    }
    return content
})

function removeSpaces() {
    console.log('dffd', language)

    removeSpacesFilter.value = true
}
</script>

<style scoped></style>
