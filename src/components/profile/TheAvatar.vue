<template>
  <div class="avatar">
    <div class="avatar__frame">
      <img :src="avatarPublicURL" alt="Avatar" class="avatar__frame--image" />
    </div>
    <div class="avatar__input-upload">
      <input
        type="file"
        id="single"
        accept="image/*"
        class="avatar__input-upload--cta"
        @change="uploadAvatarFn"
        :disabled="uploading"
      />
      <label class="avatar__input-upload--label" htmlFor="single">
        <span>{{ uploading ? "UpLoading..." : "Upload" }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/runtime-core";
import { tryCatchError } from "@/modules/ErrorHandler/typeError";
import { storeToRefs } from "pinia";
import useAvatar from "@/composables/avatar-handler-composable";
import { userStore } from "@/store/user";
const store = userStore();
const { uploadAvatar } = useAvatar();
const { avatarURL } = storeToRefs(store);
const uploading = ref(false);

const avatarPublicURL = computed(() => {
  return `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarURL.value}`;
});

async function uploadAvatarFn(event: Event) {
  // eslint-disable-next-line no-debugger
  // debugger
  try {
    uploading.value = true;
    uploadAvatar(event);
  } catch (e: unknown) {
    tryCatchError(e);
  } finally {
    uploading.value = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.avatar {
  &__frame {
    height: 162px;
    &--image {
      margin-top: 20px;
      width: 120px;
      border-radius: 2px;
      max-height: 130px;
    }
  }
  &__input-upload {
    position: relative;
    display: flex;
    width: 120px;
    margin: 20px auto;
    border: 1px solid $gray;
    padding: 10px;
    border-radius: 2px;
    &--cta {
      cursor: pointer;
      visibility: hidden;
      position: absolute;
    }
    &--label {
      position: relative;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
