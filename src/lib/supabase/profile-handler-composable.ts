import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { tryCatchError, typeError } from '@/modules/ErrorHandler/typeError'
import { userStore } from '@/store/user'

type Props = Readonly<{ session: Session | null }>

export function useProfile(props: Props) {
    const store = userStore()
    const loading = ref(false)
    const username = ref('')
    const website = ref('')
    const avatar_url = ref('')

    const handleImageUpload = async (path: string) => {
        avatar_url.value = path
        await updateProfile()
    }

    const updateProfile = async () => {
        try {
            // eslint-disable-next-line no-debugger
            // debugger
            loading.value = true
            const user = supabase.auth.user()

            if (user === null) return typeError('user === null')

            const updates = {
                id: user.id,
                username: username.value,
                website: website.value,
                avatar_url: avatar_url.value,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (e: unknown) {
            tryCatchError(e)
        } finally {
            loading.value = false
        }
    }

    const getProfile = async () => {
        try {
            loading.value = true
            if (props.session === null || props.session.user === null)
                return typeError('session.user === undefined')
            const user = props.session.user

            store.setUser(user)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                username.value = data.username
                website.value = data.website
                avatar_url.value = data.avatar_url
            }

            // eslint-disable-next-line no-debugger
            // debugger
        } catch (e: unknown) {
            tryCatchError(e)
        } finally {
            loading.value = false
        }
    }

    const profileSignOut = () => {
        supabase.auth.signOut()
    }

    return {
        avatar_url,
        getProfile,
        handleImageUpload,
        loading,
        profileSignOut,
        updateProfile,
        username,
        website,
    }
}
