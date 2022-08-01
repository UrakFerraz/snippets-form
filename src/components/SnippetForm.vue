<template>
    <div class="smippets-form">
        <h1>{{ props.msg }}</h1>
        <SnippetTextarea />
        <ActionsForm />
        <RenderizedSnippet />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import ActionsForm from './ActionsForm.vue'
import SnippetTextarea from './SnippetTextarea.vue'
import RenderizedSnippet from './RenderizedSnippet.vue'

const props = defineProps({ msg: String })
</script>
<style scoped lang="scss"></style>
