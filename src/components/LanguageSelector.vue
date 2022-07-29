<template>
    <div class="language-selector">
        <p class="language-selector__title">Select language</p>
        <select
            name="language-selector-list"
            id="language-selector-list"
            class="language-selector__list"
            v-model="selectedLanguage"
        >
            <option
                class="language-selector__option"
                v-for="(languageName, index) in languages"
                :key="index"
                :value="getLanguageName(languageName)"
            >
                {{ languageName }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import languages from '@/modules/syntax-highlighter/languages'

let selectedLanguage = ref<keyof typeof languages>('text')

provide('selected-language', selectedLanguage.value)

function getLanguageName(languageName: string) {
    const res = Object.entries(languages).find(
        (lang) => lang[1] === languageName
    )
    if (res === undefined) return new Error('language name on list')
    return res[0]
}
</script>

<style scoped lang="scss">
@import '../assets/css/colors';

.language-selector {
    padding-block: 10px;

    &__title {
        color: $gray;
    }
}

select#language-selector-list {
    width: 200px;
    background-color: inherit;
    padding: 5px 9px 5px 0;
    border: 1px solid $gray;
    border-radius: 5px;
    color: $light-gray;
}
</style>
