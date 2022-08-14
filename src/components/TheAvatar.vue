<template>
    <img :src="avatarRendered" alt="Avatar" class="avatar-image" />
    <div class="input-upload">
        <input
            type="file"
            id="single"
            accept="image/*"
            class="input-upload__cta"
            @change="uploadAvatar"
            :disabled="uploading"
        />
        <label class="input-upload__label" htmlFor="single">
            <span>{{ uploading ? 'UpLoading...' : 'Upload' }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref, watch } from '@vue/runtime-core'
import { tryCatchError, typeError } from '@/modules/ErrorHandler/typeError'
import {
    fileUploader,
    fileReaderFactory,
    downloadImage,
} from '@/lib/supabase/avatar-handler'
const props = defineProps({ url: String })

const avatarUrl: Ref<string | undefined> = ref(
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
)
const uploading = ref(false)

watch(
    () => props.url,
    (cur) => {
        downloadAvatar(cur)
    }
)

const emit = defineEmits(['onUpload'])

const avatarRendered = computed(() => {
    return avatarUrl.value
})

const downloadAvatar = async (path: string | undefined) => {
    await downloadImage(path, avatarUrl)
}

async function uploadAvatar(event: Event) {
    const target = event.target as HTMLInputElement
    if (target == null)
        return typeError(
            '======================= event target null ======================= '
        )
    const files = target.files as FileList
    // eslint-disable-next-line no-debugger
    // debugger
    try {
        uploading.value = true

        const avatar = fileReaderFactory(files)

        fileUploader(files)

        emit('onUpload', avatar.filePath)
    } catch (e: unknown) {
        tryCatchError(e)
    } finally {
        uploading.value = false
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/colors';
.avatar-image {
    margin-top: 20px;
    width: 120px;
    border-radius: 10px;
}

.input-upload {
    position: relative;
    display: flex;
    width: 120px;
    margin: 20px auto;
    border: 1px solid $gray;
    padding: 10px;
    border-radius: 8px;

    &__cta {
        cursor: pointer;
        visibility: hidden;
        position: absolute;
    }

    &__label {
        position: relative;
        margin: 0 auto;
        text-align: center;
    }
}
</style>
