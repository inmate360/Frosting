export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_token')
  
  return {
    success: true,
    message: 'Logged out successfully'
  }
})
