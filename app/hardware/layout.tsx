import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware Guide - Lights Pi",
  description: "Complete shopping list and hardware recommendations for building your Lights Pi controller",
};

export default function HardwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
