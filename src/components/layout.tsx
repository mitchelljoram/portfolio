// libraries
import Link from "next/link"

// components
import { Navbar } from "@/components/navbar"

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <Navbar />
      <main>{children}</main>
    </div>
  )
}