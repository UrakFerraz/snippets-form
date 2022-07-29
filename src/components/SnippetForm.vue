<template>
    <div class="hello">
        <h1>{{ props.msg }}</h1>
        <SnippetTextarea />
        <LanguageSelector />
        <RenderizedSnippet />
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, inject, provide } from 'vue'
import languages from '../modules/syntax-highlighter/languages'
import LanguageSelector from './LanguageSelector.vue'
import SnippetTextarea from './SnippetTextarea.vue'
import RenderizedSnippet from './RenderizedSnippet.vue'

const props = defineProps({ msg: String })

const editableCode = inject('editable-code') as string

let selectedLanguage = ref<keyof typeof languages>('text')

provide('selected-language', selectedLanguage.value)
provide('editable-code', editableCode)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/colors';

h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

.language-selector {
    padding-block: 10px;

    &__title {
        color: $gray;
    }
}

.filter-btn {
    margin-block: 20px;
}

select#language-selector-list {
    width: 200px;
    background-color: inherit;
    padding: 5px 9px 5px 0;
    border: 1px solid $gray;
    border-radius: 5px;
    color: $light-gray;
}

select > * {
    background-color: inherit;
}
</style>
