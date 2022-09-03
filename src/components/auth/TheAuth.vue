<template>
  <form class="row flex flex-center" @submit.prevent="checklogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <InputLine
        :label="'Email'"
        class="inputField"
        :type="'email'"
        placeholder="Your email"
      />
      <div>
        <InputLine
          :label="'Submit'"
          :type="'submit'"
          :is-disabled="loading"
          class="button block primary"
          :value="loading ? 'Loading' : 'Send magic link'"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useLogin } from "@/composables/login-handler-composable";
import InputLine from "@/components/InputLine.vue";
import { userStore } from "@/store/user";
import { storeToRefs } from "pinia";
const store = userStore();
const { loading } = storeToRefs(store);

const { handleLoginFn } = useLogin();
const checklogin = async () => {
  handleLoginFn();
};
</script>
