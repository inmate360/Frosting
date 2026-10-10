import { query } from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const user = await requireAuth(event)
    
    const result = await query(
      'SELECT id, email, name, wallet_balance, created_at FROM users WHERE id = $1',
      [user.userId]
    )
    
    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    return {
      success: true,
      user: result.rows[0]
    }
  } catch (error: any) {
    console.error('Me endpoint error:', error)
    throw error
  }
})
