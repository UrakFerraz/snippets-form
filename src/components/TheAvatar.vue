<template>
    <img
        :src="avatarRendered"
        alt="Avatar"
        class="avatar image"
        style="height: 150px, width: 150px"
    />
    <div style="width: 150px">
        <input
            style="visibility: hidden; position: absolute"
            type="file"
            id="single"
            accept="image/*"
            @change="uploadAvatar"
            :disabled="uploading"
        />
        <label class="button primary block" htmlFor="single">
            <span>{{ uploading ? 'UpLoading...' : 'Upload' }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref, watch } from '@vue/runtime-core'
import { supabase } from '@/lib/supabaseClient'
import { userStore } from '@/store/user'
const store = userStore()
const props = defineProps({ url: String })

const avatarUrl: Ref<string | undefined> = ref(undefined)
const uploading = ref(false)

watch(
    () => props.url,
    (cur) => {
        downloadImage(cur)
    }
)

const avatarRendered = computed(() => {
    return avatarUrl.value
})

const downloadImage = async (path: string | undefined) => {
    console.log('download path', path)

    if (!path) {
        avatarUrl.value = '../assets/no_image_available.jpeg'
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
    debugger
    try {
        uploading.value = true

        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file: File = files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        let { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (uploadError) {
            throw uploadError
        }
        store.setAvatarURL(filePath)
        console.log(store)
    } catch (e: unknown) {
        if (typeof e === 'string') {
            e.toUpperCase()
        } else if (e instanceof Error) {
            e.message
        }
    } finally {
        uploading.value = false
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
