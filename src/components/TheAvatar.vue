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
import { supabase } from '@/lib/supabaseClient'
import { userStore } from '@/store/user'
import { tryCatchError } from '@/modules/ErrorHandler/typeError'
import { supabaseUrl, supabaseAnonKey } from '@/lib/supabaseClient'
const store = userStore()
const props = defineProps({ url: String })

const avatarUrl: Ref<string | undefined> = ref(
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
)
const uploading = ref(false)

watch(
    () => props.url,
    (cur) => {
        downloadImage(cur)
    }
)

// const emit = defineEmits<{
//   (event: 'onUpload', file: File): void
// }>()

const emit = defineEmits(['onUpload'])

const avatarRendered = computed(() => {
    return avatarUrl.value
})

const downloadImage = async (path: string | undefined) => {
    console.log('download path', path)

    if (!path) {
        avatarUrl.value =
            'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        return
    }

    const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
    if (error) throw error
    avatarUrl.value = URL.createObjectURL(data as Blob)
}

async function uploadAvatar(event: Event) {
    const target = event.target as HTMLInputElement
    if (target == null) return
    const files = target.files as FileList
    // eslint-disable-next-line no-debugger
    // debugger
    try {
        uploading.value = true

        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file: File = files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
        console.log(file, fileExt, fileName, filePath)

        let { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (uploadError) {
            throw uploadError
        }

        avatarUrl.value = `${supabaseUrl}'/storage/v1/object/sign/avatars/'${fileName}.${fileExt}?token=${supabaseAnonKey}`
        console.log(filePath)

        store.setAvatarURL(filePath)
        emit('onUpload')
        console.log('store', store)
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
