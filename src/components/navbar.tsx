// libraries
import Link from "next/link"
import { useRouter } from "next/router"

// components
// import { ModeToggle } from "@/components/mode-toggle"
import config from "@/config"

export interface NavbarLinkProps {
  href: string
  activePathNames?: string[]
  children: React.ReactNode
}

export function NavbarLink({
  href,
  activePathNames,
  children,
  ...props
}: NavbarLinkProps) {
  const { pathname } = useRouter()
  return (
    <Link href={href} passHref>
      <a
        textDecoration="none"
        color="text"
        fontSize="lg|md"
        fontWeight={
          pathname === href || activePathNames?.includes(pathname)
            ? "semibold"
            : "normal"
        }
        _hover={{
          color: "primary",
          textDecoration: "underline",
        }}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export function Navbar({ ...props }) {
  return (
    <header
      position="static|sticky"
      top="0"
      bg="background"
      opacity="0.85"
      py="8"
      zIndex="1000"
      backdropFilter="saturate(100%) blur(10px)"
      {...props}
    >
      <div
        variant="container"
        display="flex"
        flexDirection="column|row"
        alignItems="flex-start|center"
        justifyContent="space-between"
      >
        <h1
            display="flex"
            w="100%"
            textDecoration="none"
            color="text"
            alignItems="center"
            fontSize="4xl|xl"
            fontWeight="semibold"
            mr="0|10"
            mb="2|0"
        >
            {config.site.name}
        </h1>
        <div
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="space-between|flex-end"
          ml="0|auto"
        >
          <div
            display="inline-grid"
            col={`repeat(${config.links.length}, minmax(0,auto))`}
            gap="10"
          >
            {config.links.map((link) => (
              <NavbarLink key={link.url} href={link.url}>
                {link.title}
              </NavbarLink>
            ))}
          </div>
          {/*<ModeToggle ml="10" />*/}
        </div>
      </div>
    </header>
  )
}