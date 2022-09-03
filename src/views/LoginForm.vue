<template>
  <div class="login-form">
    <Login />
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/auth/TheLogin.vue"; // @ is an alias to /src
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  justify-content: center;
}
</style>
