import { fileUploader, downloadImage } from '@/lib/supabase/avatar-handler'
import { typeError } from "@/modules/ErrorHandler/typeError";
import {useProfile} from '@/lib/supabase/profile-handler-composable'
import { userStore } from "@/store/user";
const store = userStore();
const { handleImageUpload } = useProfile({session: store.getUser})
export default function useAvatar() {
    const uploadAvatar = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target == null) return typeError("event target null");
        const files = target.files as FileList;
        await fileUploader(files)
        await handleImageUpload()
    }
    const downloadAvatar = async (avatarURL: string) => {
        return await downloadImage(avatarURL)
    }
    return { uploadAvatar, downloadAvatar }
}
