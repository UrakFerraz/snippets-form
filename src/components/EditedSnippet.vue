<template>
    <RenderizedSnippet :edited="edited" :language="language" />
</template>

<script setup lang="ts">
import RenderizedSnippet from '@/components/RenderizedSnippet.vue'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
const store = snippetStore()
const { edited, language } = storeToRefs(store)
</script>

<style scoped>
.code {
    max-height: 700px;
    overflow: auto;
}
</style>
