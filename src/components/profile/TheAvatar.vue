<template>
  <div class="avatar">
    <div class="avatar__frame">
      <img :src="avatarSrc" alt="Avatar" class="avatar__frame--image" />
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
import { onMounted, ref, watch, onBeforeMount } from "@vue/runtime-core";
import { tryCatchError } from "@/modules/ErrorHandler/typeError";
import { storeToRefs } from "pinia";
import { useAvatar } from "@/composables/avatar-handler-composable";
import { userStore } from "@/store/user";
import avatarFallback from "@/assets/avatar-fallback";
const store = userStore();
const { uploadAvatar } = useAvatar();
const { avatarURL } = storeToRefs(store);
const uploading = ref(false);
const avatarSrc = ref(avatarFallback);

function createAvatarSrc(value: string) {
  console.log("pag", value);
  if (/\d\.\d*?\.[a-z]{3,4}/gm.test(value) === false) return avatarFallback;
  avatarSrc.value = `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarURL.value}`;
}

watch(avatarURL, (newValue) => {
  createAvatarSrc(newValue);
});

onBeforeMount(() => {
  avatarSrc.value = avatarFallback;
});

onMounted(async () => {
  createAvatarSrc(avatarURL.value);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  &__frame {
    height: 100px;
    width: 80px;
    border-radius: 4px;
    margin-top: 20px;
    &--image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 2px;
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
