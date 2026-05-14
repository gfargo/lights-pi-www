/**
 * Estimates reading time for markdown content.
 * Uses 200 words per minute (average for technical content).
 */
export function getReadingTime(markdown: string): number {
  // Strip code blocks (readers skim these)
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "")
  // Strip markdown syntax
  const plainText = withoutCode
    .replace(/[#*_`\[\]()>|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  const wordCount = plainText.split(" ").filter(Boolean).length
  const minutes = Math.ceil(wordCount / 200)
  return Math.max(1, minutes) // Minimum 1 minute
}
