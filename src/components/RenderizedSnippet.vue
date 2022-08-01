<template>
    <div className="Code">
        <pre :class="languageClassName" v-html="codeContentToHTML"></pre>
    </div>
</template>

<script setup lang="ts">
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { computed } from 'vue'
import { snippetStore } from '@/store/snippet'
const store = snippetStore()
const codeContentToHTML = computed(() => {
    return highlightedCodeElement(store.mainEdited, store.mainLanguage)
})
const languageClassName = computed(() => {
    return `language-${store.mainLanguage}`
})
</script>

<style scoped></style>
