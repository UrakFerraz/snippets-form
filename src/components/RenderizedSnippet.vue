<template>
    <div>
        <button @click="removeSpaces()" class="filter-btn">
            Remover tabulação e quebras de linha
        </button>
        <div className="Code">
            <pre
                :class="`language-${selectedLanguage}`"
                v-html="codeContentToHTML"
            ></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { removeWhiteSpaces } from '@/modules/code-editor/remove-spaces'
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { inject, computed, ref } from 'vue'

const selectedLanguage = inject('selected-language') as string
const removeSpacesFilter = ref<boolean>(false)
const editableCode = inject('editable-code') as string
const codeContentToHTML = computed(() => {
    console.log(removeSpacesFilter.value)
    const content = highlightedCodeElement(editableCode, selectedLanguage)
    if (removeSpacesFilter.value) {
        return removeWhiteSpaces(content)
    }
    return content
})

function removeSpaces() {
    removeSpacesFilter.value = true
}
</script>

<style scoped></style>
