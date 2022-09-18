import { supabase } from '@/lib/supabaseClient'
import { typeError } from '@/modules/ErrorHandler/typeError'
import fileReaderNormalizedToSupabase from './file-reader'
import avatarFallback from '@/assets/avatar-fallback'

type Files = FileList

async function fileUploader(files: Files, fileUploadCallbackFn: (fName: string) => void) {
    if (!files) {
        return typeError('You must select an image to upload.')
    }
    const avatar = fileReaderNormalizedToSupabase(files)
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(avatar.filePath, avatar.file)
        fileUploadCallbackFn(avatar.filePath)
        console.log('avatar.filePath', avatar.filePath);

    if (uploadError) {
        throw uploadError
    }
}

// use this method when you will need to get private images
const downloadImage = async (fileName: string | undefined) => {
    console.log('download fileName', fileName)
    if (!fileName) {
        return avatarFallback
    } else {
        console.log(
            'teste',
            `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`
        )
    }
    const { data, error } = await supabase.storage
        .from('avatars')
        .download(fileName)
    if (error) throw error
    console.log('data downloadImage', data)
    return URL.createObjectURL(data as Blob)
}

export { fileUploader, downloadImage }
