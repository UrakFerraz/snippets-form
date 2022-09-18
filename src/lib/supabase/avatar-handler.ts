import { supabase } from '@/lib/supabaseClient'
import { typeError } from '@/modules/ErrorHandler/typeError'
import fileReaderNormalizedToSupabase from './file-reader'

type Files = FileList

async function fileUploader(files: Files) {
    if (!files) {
        return typeError('You must select an image to upload.')
    }
    const avatar = fileReaderNormalizedToSupabase(files)
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(avatar.filePath, avatar.file)
    if (uploadError) {
        throw uploadError
    }
}

const downloadImage = async (fileName: string | undefined) => {
    console.log('download fileName', fileName)
    if (!fileName) {
        return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
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
    console.log('data', data)
    return URL.createObjectURL(data as Blob)
}

export { fileUploader, downloadImage }
