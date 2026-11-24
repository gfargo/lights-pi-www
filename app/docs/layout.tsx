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
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <div className="flex gap-12 xl:gap-16">
        <DocsSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
