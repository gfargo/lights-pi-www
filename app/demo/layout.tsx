import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground - Lights Pi",
  description: "Try Lights Pi in the browser. Interactive demo of the DMX control interface, AI scene generation, and MCP tool calls — no hardware required.",
  alternates: {
    canonical: "https://lights.griffen.codes/demo",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
