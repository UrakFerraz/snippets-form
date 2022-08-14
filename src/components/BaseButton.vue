<template>
    <div class="button-container">
        <button @click="buttonClicked()" class="filter-btn">
            {{ props.title }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { snippetStore } from '@/store/snippet'

const props = defineProps(['type', 'title'])
const store = snippetStore()

function buttonClicked() {
    if (props.type === 'filter') store.removeSpaces()
    if (props.type === 'copy') store.copySnippet()
    if (props.type === 'undo') store.undoSnippet()
}
</script>

<style scoped lang="scss">
.button-container {
    margin-block: 10px;
}
</style>
