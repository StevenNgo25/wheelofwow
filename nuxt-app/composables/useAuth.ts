import { ref, computed } from 'vue'

export const useAuth = () => {
  const { supabase, auth } = useSupabase()
  const user = useState('user', () => null)
  const loading = ref(false)

  // Get current session
  const getSession = async () => {
    const { data, error } = await auth.getSession()
    if (data.session) {
      user.value = data.session.user
    }
    return { data, error }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    loading.value = true
    const { data, error } = await auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    loading.value = false
    return { data, error }
  }

  // Sign in with email
  const signInWithEmail = async (email: string, password: string) => {
    loading.value = true
    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    })
    if (data.user) {
      user.value = data.user
    }
    loading.value = false
    return { data, error }
  }

  // Sign up with email
  const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
    loading.value = true
    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    loading.value = false
    return { data, error }
  }

  // Sign out
  const signOut = async () => {
    loading.value = true
    const { error } = await auth.signOut()
    user.value = null
    loading.value = false
    return { error }
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    loading,
    isAuthenticated,
    getSession,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  }
}
