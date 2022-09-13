<template>
  <RenderizedSnippet :edited="edited" :language="language" />
</template>

<script setup lang="ts">
import RenderizedSnippet from "./RenderizedSnippet.vue";
import { editedSnippetStore } from "@/store/snippet/edited";
import { storeToRefs } from "pinia";
const store = editedSnippetStore();
const { edited, language } = storeToRefs(store);
</script>

<style scoped>
.code {
  max-height: 700px;
  overflow: auto;
}
</style>
