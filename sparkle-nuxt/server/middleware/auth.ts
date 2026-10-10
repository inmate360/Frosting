export default defineEventHandler((event) => {
  // Auth middleware
  const path = event.node.req.url
  
  // Skip auth for public routes
  if (path?.startsWith('/api/auth/') || path?.startsWith('/api/public/')) {
    return
  }
})
