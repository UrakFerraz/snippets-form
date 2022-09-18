import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { tryCatchError, typeError } from '@/modules/ErrorHandler/typeError'
import { userStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { inputsStore } from '@/store/inputs'
const storeInputs = inputsStore()
const store = userStore()
const { username, website } = storeToRefs(storeInputs)
type Props = Readonly<{ session: Session | null }>

export function useProfile(props: Props | null) {
    const handleImageUpload = async () => {
        await updateProfile()
    }

    const updateProfile = async () => {
        try {
            // eslint-disable-next-line no-debugger
            // debugger
            store.setLoading(true)
            const user = supabase.auth.user()

            if (user === null) return typeError('user === null')

            console.log('avatar_url.value', store.avatarURL);


            const updates = {
                id: user.id,
                username: username.value,
                website: website.value,
                avatar_url: store.avatarURL,
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
            store.setLoading(false)
        }
    }

    const getProfile = async () => {
        try {
            store.setLoading(true)

            if (props === null || props.session === null || props.session.user === null) return typeError('session.user === undefined')
            if (store === null || store.getUser === null || store.getUser.user === null) return typeError('store.user === undefined')

            store.setUser(props.session.user)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', store.getUser.user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                storeInputs.setUsername(data.username)
                storeInputs.setWebsite(data.website)
                storeInputs.setEmail(data.email)
                store.setAvatarURL(data.avatar_url)
            }

            // eslint-disable-next-line no-debugger
            // debugger
        } catch (e: unknown) {
            tryCatchError(e)
        } finally {
            store.setLoading(false)
        }
    }

    const profileSignOut = () => {
        supabase.auth.signOut()
    }

    return {
        getProfile,
        handleImageUpload,
        profileSignOut,
        updateProfile,
    }
}
