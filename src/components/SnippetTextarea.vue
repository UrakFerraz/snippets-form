<template>
    <textarea
        class="snippet-textarea"
        rows="6"
        cols="1"
        v-model.trim="editableCode"
        placeholder="Paste code here..."
    ></textarea>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

let editableCode = ref<string>('')

provide('editable-code', editableCode.value)
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
