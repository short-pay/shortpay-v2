import { env } from '@/env'
import crypto from 'node:crypto'

const algorithm = 'aes-256-gcm' // Algoritmo de criptografia
const secretKey = env.AES_ENCRYPTION_KEY || 'default_secret_key'
const ivLength = 16 // Tamanho do IV (Initialization Vector)

/**
 * Criptografa um dado.
 */
export function encrypt(data: string): string {
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, 'utf-8'),
    iv,
  )

  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag().toString('hex')
  return `${iv.toString('hex')}:${authTag}:${encrypted}`
}

/**
 * Descriptografa um dado.
 */
export function decrypt(data: string): string {
  const [ivHex, authTagHex, encryptedData] = data.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, 'utf-8'),
    iv,
  )
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
