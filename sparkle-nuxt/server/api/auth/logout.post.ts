export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, 'auth_token')
    
    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error: any) {
    console.error('Logout error:', error)
    throw error
  }
})
