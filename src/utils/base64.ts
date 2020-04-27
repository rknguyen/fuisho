/**
 * Encrypt string to base64
 * @param text string
 */
export function btoa(text: string) {
  return Buffer.from(text).toString('base64')
}

/**
 * Decrypt base64 encrypted string
 * @param base64 base64 string
 */
export function atob(base64: string) {
  return Buffer.from(base64, 'base64').toString()
}
