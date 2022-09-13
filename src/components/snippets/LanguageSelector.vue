<template>
  <div class="language-selector">
    <p class="language-selector__title">Select language</p>
    <div :class="enableSelector">
      <select id="standard-select" v-model="selectedLanguage">
        <option
          class="language-selector__option"
          v-for="(languageName, index) in languages"
          :key="index"
          :value="getLanguageName(languageName)"
        >
          {{ languageName }}
        </option>
      </select>
      <span class="focus"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import languages from "@/modules/syntax-highlighter/languages";
import { editedSnippetStore } from "@/store/snippet/edited";
import { storeToRefs } from "pinia";
import { typeError } from "@/modules/ErrorHandler/typeError";
const store = editedSnippetStore();
const { snippet } = storeToRefs(store);
let selectedLanguage = ref<keyof typeof languages>("text");

watch(selectedLanguage, () => {
  store.language = selectedLanguage.value;
});

const enableSelector = computed(() => {
  return snippet.value !== "hello world" ? "select" : "select select--disabled";
});

function getLanguageName(languageName: string) {
  const res = Object.entries(languages).find((lang) => lang[1] === languageName);
  if (res === undefined) return typeError("language name on list");
  return res[0];
}
</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
.language-selector {
  margin-bottom: 10px;
  &__title {
    color: $light-gray;
  }
}

select {
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  color: $light-gray;
  // Stack above custom arrow
  z-index: 1;

  // Remove dropdown arrow in IE10 & IE11
  // @link https://www.filamentgroup.com/lab/select-css.html
  &::-ms-expand {
    display: none;
  }

  // Remove focus outline, will add on alternate element
  outline: none;
}

.select {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;
  max-width: 30ch;

  border: 1px solid $principal;
  border-radius: 2px;
  padding: 0.25em 0.5em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

  // Optional styles
  // remove for transparency
  background-color: $darkest-color;

  // Custom arrow
  &:not(.select--multiple)::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: $dark-color;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
}

// Interim solution until :focus-within has better support
select:focus + .focus {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid $principal;
  border-radius: 2px;
}

select[multiple] {
  padding-right: 0;

  /*
   * Safari will not reveal an option
   * unless the select height has room to
   * show all of it
   * Firefox and Chrome allow showing
   * a partial option
   */
  height: 6rem;

  option {
    white-space: normal;

    // Only affects Chrome
    outline-color: $light-gray;
  }

  /*
   * Experimental - styling of selected options
   * in the multiselect
   * Not supported crossbrowser
   */
  // &:not(:disabled) option {
  //     border-radius: 12px;
  //     transition: 120ms all ease-in;

  //     &:checked {
  //         background: linear-gradient(hsl(242, 61%, 76%), hsl(242, 61%, 71%));
  //         padding-left: 0.5em;
  //         color: black !important;
  //     }
  // }
}

.select--disabled {
  cursor: not-allowed;
  background-color: $darkest-color;
}

label {
  font-size: 1.125rem;
  font-weight: 500;
}

.select + label {
  margin-top: 2rem;
}
</style>
