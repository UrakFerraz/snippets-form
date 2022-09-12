<template>
  <div>
    <label v-if="props.label !== undefined">{{ props.label }}</label>
    <input
      v-if="type === 'submit' || type === 'button' || type === 'reset'"
      :type="type"
      :disabled="isDisabled"
      :required="isRequired"
      :value="value"
    />
    <input
      v-else
      :type="type"
      :disabled="isDisabled"
      :required="isRequired"
      :placeholder="placeholder"
      v-model="fieldValue"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { inputsStore } from "@/store/inputs";
const store = inputsStore();

const props = defineProps<{
  label: string;
  type: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
}>();

const fieldValue = ref("");

watch(fieldValue, () => {
  switch (props.label.toLowerCase()) {
    case "username":
      store.setUsername(fieldValue.value);
      break;
    case "email":
      store.setEmail(fieldValue.value);
      break;
    case "website":
      store.setWebsite(fieldValue.value);
      break;
    case "title":
      store.setTitle(fieldValue.value);
      break;
    case "tags":
      store.setTags(fieldValue.value);
      break;
    case "language":
      store.setLanguage(fieldValue.value);
      break;
    case "password":
      store.setPassword(fieldValue.value);
      break;
    case "confirmpassword":
      store.setConfirmPassword(fieldValue.value);
      break;
    default:
      break;
  }
});
</script>
