import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDescriptionWithParagraphIndent(text?: string | null): string {
  if (!text) return ''

  // Normalize newlines and add a tab at the start of every user-entered line.
  const normalizedText = text.replace(/\r\n/g, '\n').trim()
  if (!normalizedText) return ''

  return normalizedText
    .split('\n')
    .map((line) => line.trim())
    .map((line) => (line ? `\t${line}` : ''))
    .join('\n')
}
