<template>
    <div class="code">
        <pre :class="languageClassName" v-html="codeContentToHTML"></pre>
    </div>
</template>

<script setup lang="ts">
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { computed } from 'vue'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
const store = snippetStore()
const { edited, language } = storeToRefs(store)
const codeContentToHTML = computed(() => {
    return highlightedCodeElement(edited.value, language.value)
})
const languageClassName = computed(() => {
    return `language-${store.mainLanguage}`
})
</script>

<style scoped>
.code {
    max-height: 700px;
    overflow: auto;
    margin-inline: 10vw;
}
</style>
