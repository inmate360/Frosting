import { query } from '~/server/utils/db'
import { hashPassword, generateToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, name } = body

    // Validation
    if (!email || !password || !name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email, password, and name are required'
      })
    }

    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 8 characters'
      })
    }

    // Check if user exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
    if (existing.rows.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User already exists'
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const result = await query(
      'INSERT INTO users (email, password, name, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, email, name',
      [email.toLowerCase(), hashedPassword, name]
    )

    const user = result.rows[0]
    const token = generateToken(user.id.toString(), user.email)

    // Set auth cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict'
    })

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
    console.error('Signup error:', error)
    throw error
  }
})
