// libraries
import Link from "next/link"

// components
import config from "@/config"
import { Navbar } from "@/components/navbar"

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        maxWidth: 1024,
        margin: "0 auto",
      }}
    >
      <Navbar />
      <main style={{ maxWidth: 800, margin: "0 auto",}}>{children}</main>
      <footer py="12|18|20">
        <div variant="container.lg">
          <div borderTopWidth="1" display="flex" justifyContent="center" pt="6">
            {config.site.copyright ? (
              <p fontSize="sm" color="gray">
                {config.site.copyright}
              </p>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  )
}