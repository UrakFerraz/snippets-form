<template>
    <textarea
        class="snippet-textarea"
        rows="6"
        cols="1"
        v-model="editableCode"
        placeholder="Paste code here..."
    ></textarea>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { snippetStore } from '@/store/snippet'
const store = snippetStore()
let editableCode = ref<string>('')
watch(editableCode, () => {
    store.snippet = editableCode.value
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
