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
        <button
            @click="undoSnippet()"
            class="filter-btn"
            v-if="props.type === 'undo'"
        >
            Desfazer edição
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { snippetStore } from '@/store/snippet'

const props = defineProps({ type: String })
const store = snippetStore()

function removeSpaces() {
    store.removeSpaces()
}

function copySnippet() {
    store.copySnippet()
}

function undoSnippet() {
    store.undoSnippet()
}
</script>

<style scoped lang="scss"></style>
