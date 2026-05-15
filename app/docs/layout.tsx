import { DocsSidebar } from "@/components/docs"

export const metadata = {
  title: {
    template: "%s | Lights Pi Docs",
    default: "Documentation | Lights Pi",
  },
  description: "Complete documentation for Lights Pi lighting controller",
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex gap-12">
          <DocsSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
