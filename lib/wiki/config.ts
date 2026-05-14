/**
 * Wiki configuration — single source of truth for GitHub Wiki settings.
 */

export const WIKI_OWNER = "gfargo"
export const WIKI_REPO = "lights-pi"
export const WIKI_RAW_BASE = `https://raw.githubusercontent.com/wiki/${WIKI_OWNER}/${WIKI_REPO}`
export const WIKI_BASE_URL = `https://github.com/${WIKI_OWNER}/${WIKI_REPO}/wiki`

/** ISR revalidation interval in seconds (1 hour) */
export const REVALIDATE_INTERVAL = 3600
