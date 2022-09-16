<template>
  <ul class="snippets">
    <li class="snippets-list" v-for="snippet in savedSnippets" :key="snippet.id">
      <div class="snippets-list__cell">{{ snippet.title }}</div>
      <div class="snippets-list__cell">
        <RenderizedSnippet :language="snippet.language" :edited="snippet.snippet" />
      </div>
      <div class="snippets-list__tags">
        <span v-for="(item, index) in getTags(snippet)" :key="index">
          {{ item }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { savedSnippetStore } from "@/store/snippet/saved";
import RenderizedSnippet from "./RenderizedSnippet.vue";
import { useSnippet } from "@/composables/snippets-handler-composable";
const savedStore = savedSnippetStore();
const { savedSnippets } = storeToRefs(savedStore);
const { readSnippetsFn } = useSnippet();

type Snippet = {
  id: number;
  created_at: string;
  snippet: string;
  title: string;
  tags: string;
  user_id: string;
  language: string;
};

function getTags(snippet: Snippet) {
  return snippet.tags.split(",");
}

onBeforeMount(async () => await readSnippetsFn());
</script>

<style lang="scss" scoped>
.snippets {
  margin-block: 20px;
  margin-inline: 10vw;
  &-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-block: 50px;
    &__cell {
      color: $light-gray;
      text-align: left;
    }
    &__tags {
      display: flex;
      gap: 10px;
      span {
        background: $dark-color;
        border-radius: 2px;
        padding: 6px 10px;
        color: $light;
      }
    }
  }
}
</style>
