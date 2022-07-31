<template>
    <div class="hello">
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
