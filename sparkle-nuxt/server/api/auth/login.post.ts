import { query } from '~/server/utils/db'
import { verifyPassword, generateToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password required'
      })
    }

    // Find user
    const result = await query('SELECT id, email, name, password FROM users WHERE email = $1', [email])
    
    if (result.rows.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const user = result.rows[0]
    const passwordMatch = await verifyPassword(password, user.password)

    if (!passwordMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const token = generateToken(user.id, user.email)
    setCookie(event, 'auth_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    }
  } catch (error: any) {
    console.error('Login error:', error)
    throw error
  }
})
