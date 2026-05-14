import { getCategories, getDocsByCategory } from "@/lib/wiki"
import { DocsSidebarClient } from "./DocsSidebarClient"

/**
 * Server component that fetches sidebar data and passes it to the client component.
 */
export async function DocsSidebar() {
  const categories = await getCategories()

  const categoriesWithDocs = await Promise.all(
    categories.map(async (cat) => {
      const docs = await getDocsByCategory(cat.slug)
      return {
        ...cat,
        docs: docs.map((d) => ({ slug: d.slug, title: d.title })),
      }
    })
  )

  return <DocsSidebarClient categories={categoriesWithDocs} />
}
