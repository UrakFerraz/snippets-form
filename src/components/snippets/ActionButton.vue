<template>
  <div class="button-container">
    <button @click="buttonClicked()" class="filter-btn">
      {{ props.title }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { editedSnippetStore } from "@/store/snippet/edited";
import { useRouter } from "vue-router";
const router = useRouter();
const store = editedSnippetStore();
const props = defineProps(["type", "title"]);

function buttonClicked() {
  if (props.type === "filter") store.removeSpaces();
  if (props.type === "copy") store.copySnippet();
  if (props.type === "undo") store.undoSnippet();
  if (props.type === "reset") store.resetSnippet();
  if (props.type === "save") router.push({ name: "save-form" });
}
</script>

<style scoped lang="scss">
.button-container {
  margin-block: 10px;
}
</style>
