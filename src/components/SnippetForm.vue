<template>
    <div class="hello">
        <h1>{{ props.msg }}</h1>
        <textarea
            class="snippet-textarea"
            rows="6"
            cols=""
            v-model="editableCode"
            placeholder="Paste code here..."
        ></textarea>
        <div class="language-selector">
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
        <h1>{{ selectedLanguage }}</h1>
        <div className="Code">
            <pre :class="`language-${selectedLanguage}`">
                <code :class="`language-${selectedLanguage}`" v-html="codeContent"></code>
            </pre>
        </div>
        <button @click="removeSpaces()">Remover espaços</button>
    </div>
</template>

<script setup lang="ts">
import highlightedCodeElement from '@/modules/syntax-highlighter/syntax-highlighter'
import { defineProps, ref, computed } from 'vue'
import languages from '../modules/syntax-highlighter/languages'
import { removeWhiteSpaces } from '../modules/code-editor/remove-spaces'

const props = defineProps({ msg: String })

let selectedLanguage = ref<keyof typeof languages>('text')
let editableCode = ref<string>(
    highlightedCodeElement('', selectedLanguage.value)
)

const codeContent = computed(() => {
    return highlightedCodeElement(editableCode.value, selectedLanguage.value)
})

function getLanguageName(languageName: string) {
    const res = Object.entries(languages).find(
        (lang) => lang[1] === languageName
    )
    if (res === undefined) return new Error('language name on list')
    return res[0]
}

function removeSpaces() {
    editableCode.value = removeWhiteSpaces(editableCode.value)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.snippet-textarea {
    border: 1px solid #888;
    width: clamp(60%, 50%, 90%);
}
</style>
