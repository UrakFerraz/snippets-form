<template>
  <h1 class="profile-form__header">Supabase + Vue.js: Account</h1>
  <Avatar :url="avatar_url" @onUpload="handleImageUpload" />
  <ProfileForm
    :session="session"
    @onUpdateProfile="updateProfile()"
    @onProfileSignOut="profileSignOut()"
  />
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
