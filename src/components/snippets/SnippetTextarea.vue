<template>
  <textarea
    class="snippet-textarea"
    rows="12"
    spellcheck="false"
    cols="1"
    v-model="snippet"
    placeholder="Paste code here..."
  ></textarea>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { editedSnippetStore } from "@/store/snippet/edited";
import { storeToRefs } from "pinia";
const store = editedSnippetStore();
const { edited } = storeToRefs(store);
let snippet = ref<string>("");
watch([snippet, edited], (newValues, oldValues) => {
  if (newValues[0] !== oldValues[0]) {
    store.addSnippet(newValues[0]);
    store.addEdited(newValues[0]);
  }
  if (newValues[1] !== oldValues[1]) {
    snippet.value = newValues[0];
  }
});
</script>

<style scoped lang="scss">
.snippet-textarea {
  padding: 10px;
  box-sizing: border-box;
  color: $light-gray;
  background-color: inherit;
  border: 1px solid $gray;
  width: clamp(300px, 80%, 1500px);
}
</style>
