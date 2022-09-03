<template>
  <div class="profile-form">
    <h1 class="profile-form__header">Supabase + Vue.js: Account</h1>
    <Avatar :url="avatar_url" @onUpload="handleImageUpload" />
    <ProfileForm
      :session="session"
      @onUpdateProfile="updateProfile()"
      @onProfileSignOut="profileSignOut()"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Avatar from "@/components/profile/TheAvatar.vue";
import ProfileForm from "@/components/profile/ProfileForm.vue";
import { useProfile } from "@/lib/supabase/profile-handler-composable";
import { Session } from "@supabase/supabase-js";

const props = defineProps<{ session: Session | null }>();

const {
  avatar_url,
  getProfile,
  handleImageUpload,
  profileSignOut,
  updateProfile,
} = useProfile(props);

onMounted(() => {
  return getProfile();
});
</script>

<style lang="scss" scoped>
.profile-form {
  margin-block: 20px;
  width: 90vw;
  max-width: 700px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  padding: 30px;
}
</style>
