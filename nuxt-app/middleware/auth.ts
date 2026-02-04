export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, getSession } = useAuth()
  
  // Get current session
  if (!user.value) {
    await getSession()
  }

  // Redirect to login if not authenticated
  if (!user.value) {
    return navigateTo('/login')
  }
})
