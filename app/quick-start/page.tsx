import { redirect } from "next/navigation"

/**
 * Redirects /quick-start to /docs/quick-start.
 * Content now lives in the GitHub Wiki and is rendered via the docs system.
 */
export default function QuickStartPage() {
  redirect("/docs/quick-start")
}
