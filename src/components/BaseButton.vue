<template>
    <div class="button-container">
        <button
            @click="removeSpaces()"
            class="filter-btn"
            v-if="props.type === 'filter'"
        >
            Remover tabulação e quebras de linha
        </button>
        <button
            @click="copySnippet()"
            class="filter-btn"
            v-if="props.type === 'copy'"
        >
            Copiar
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
import { removeWhiteSpaces } from '@/modules/code-editor/remove-spaces'
import copyToClipboard from '@/modules/code-editor/copy-to-clipboard'
const props = defineProps({ type: String })
const store = snippetStore()
const { snippet } = storeToRefs(store)

function removeSpaces() {
    snippet.value = removeWhiteSpaces(snippet.value)
}

function copySnippet() {
    copyToClipboard(snippet.value)
}
</script>

<style scoped lang="scss">
.button-container {
    margin-block: 10px;
}
</style>
