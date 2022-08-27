<template>
    <textarea
        class="snippet-textarea"
        rows="12"
        cols="1"
        v-model="snippet"
        placeholder="Paste code here..."
    ></textarea>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { snippetStore } from '@/store/snippet'
import { storeToRefs } from 'pinia'
const store = snippetStore()
const { edited } = storeToRefs(store)
let snippet = ref<string>('')
watch([snippet, edited], (newValues, oldValues) => {
    if (newValues[0] !== oldValues[0]) {
        store.addSnippet(newValues[0])
        store.addEdited(newValues[0])
    }
    if (newValues[1] !== oldValues[1]) {
        snippet.value = newValues[0]
    }
})
</script>

<style scoped lang="scss">
@import '../assets/css/colors';
.snippet-textarea {
    padding: 10px;
    box-sizing: border-box;
    color: $light-gray;
    background-color: inherit;
    border: 1px solid $gray;
    width: clamp(300px, 80%, 1500px);
}
</style>
