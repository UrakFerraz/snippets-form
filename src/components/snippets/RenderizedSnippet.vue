<template>
    <div class="code">
        <pre :class="languageClassName" v-html="codeContentToHTML"></pre>
    </div>
</template>

<script setup lang="ts">
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { computed } from 'vue'
type Props = {
    edited: string
    language: string
}
const props = defineProps<Props>()
const codeContentToHTML = computed(() => {
    return highlightedCodeElement(props.edited, props.language)
})
const languageClassName = computed(() => {
    return `language-${props.language}`
})
</script>

<style scoped>
.code {
    max-height: 700px;
    overflow: auto;
    width: 100%;
}
</style>
