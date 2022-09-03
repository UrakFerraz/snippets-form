<template>
  <div class="login">
    <form @submit.prevent="signIn">
      <h1>Login</h1>
      <InputLine :label="'Email'" :type="'text'" :is-required="true" />
      <InputLine :label="'Password'" :type="'password'" :is-required="true" />
      <div class="login__actions">
        <button type="submit">Login</button>

        <router-link :to="{ name: 'register' }">
          Don't have an account?
          <span>Register</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputLine from "@/components/InputLine.vue";
import { useLogin } from "@/composables/login-handler-composable";
import { useRouter } from "vue-router";
const { loginFn } = useLogin();
const router = useRouter();
const signIn = async () => {
  await loginFn();
  router.push({ name: "profile" });
};
</script>

<style lang="scss" scoped>
.login {
  margin-block: 20px;
  width: 90vw;
  max-width: 700px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  padding: 30px;
  &__actions {
    margin-block: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }
}
</style>
