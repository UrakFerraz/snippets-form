import { supabase } from '@/lib/supabaseClient'
import { typeError } from '@/modules/ErrorHandler/typeError'
import { Ref } from 'vue'
import { userStore } from '@/store/user'

const store = userStore()

type Files = FileList
type AvatarUrl = Ref<string | undefined>

function fileReaderFactory(files: Files) {
    if (!files || files.length === 0) {
        typeError('You must select an image to upload.')
    }
    const file: File = files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    console.log(file, fileExt, fileName, filePath)
    return { file, fileExt, fileName, filePath }
}

async function fileUploader(files: Files) {
    const avatar = fileReaderFactory(files)
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(avatar.filePath, avatar.file)

    if (uploadError) {
        throw uploadError
    }
    store.setAvatarURL(avatar.filePath)
}

const downloadImage = async (
    path: string | undefined,
    avatarUrl: AvatarUrl
) => {
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
    console.log(data)

    avatarUrl.value = URL.createObjectURL(data as Blob)
}

export { fileUploader, fileReaderFactory, downloadImage }
