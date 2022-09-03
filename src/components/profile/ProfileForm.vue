<template>
  <div class="profile-form">
    <InputLine
      v-if="session && session.user"
      :label="'Email'"
      :type="'text'"
      :placeholder="session.user.email"
      :is-disabled="true"
    />
    <InputLine :label="'Username'" :type="'text'" />
    <InputLine :label="'Website'" :type="'text'" />
    <div class="profile-form__actions">
      <button class="button block primary" @click="updateProfile()" :disabled="loading">
        <span>{{ loading ? "Loading..." : "Update" }}</span>
      </button>
      <button class="button block" @click="profileSignOut()">Sign Out</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { Session } from "@supabase/supabase-js";
import InputLine from "@/components/InputLine.vue";
import { userStore } from "@/store/user";
import { storeToRefs } from "pinia";
const store = userStore();
const { loading } = storeToRefs(store);
type Props = {
  session: Session | null;
};
const props = defineProps<Props>();
const { session } = toRefs(props);
const emit = defineEmits(["onUpdateProfile", "onProfileSignOut"]);
function updateProfile() {
  emit("onUpdateProfile");
}
function profileSignOut() {
  emit("onProfileSignOut");
}
</script>

<style scoped lang="scss">
.profile-form {
  &__actions {
    margin-top: 30px;
    display: flex;
    gap: 50px;
    flex-direction: column;
    align-items: center;
  }
}

input {
  &::placeholder {
    color: $darkest-color;
  }
}
</style>
