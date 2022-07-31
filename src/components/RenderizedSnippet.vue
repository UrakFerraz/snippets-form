<template>
    <div className="Code">
        <pre :class="`language-${language}`" v-html="codeContentToHTML"></pre>
    </div>
</template>

<script setup lang="ts">
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { computed } from 'vue'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
const store = snippetStore()
const { snippet, language } = storeToRefs(store)
const codeContentToHTML = computed(() => {
    return highlightedCodeElement(snippet.value, language.value)
})
</script>

<style scoped></style>
