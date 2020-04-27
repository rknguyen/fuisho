export function normalize(text: string) {
  return text
    .replace('________________\r\n\r\n', '')
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
}
