import { typeError } from '@/modules/ErrorHandler/typeError'

type Files = FileList

export default function fileReaderNormalizedToSupabase(files: Files) {
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
