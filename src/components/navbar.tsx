// libraries
import Link from "next/link"
import Image from "next/image"
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
        onClick={() => {window.location.href=`/${children.toString().toLowerCase() === 'home' ? '' : children.toString().toLowerCase()}`}}
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
          w="70%"
          textDecoration="none"
          color="text"
          justifyContent="flex-start"
          alignItems="center"
          fontSize="4xl|xl"
          fontWeight="semibold"
          mb="2|0"
        >
          {config.site.name}
        </h1>
        <div
          display="flex"
          w="100%"
          justifyContent="flex-end"
          alignItems="center"
          ml="0|auto"
        >
          <div
            display="inline-grid"
            col={`repeat(${config.links.length+1}, minmax(0,auto))`}
            gap="10"
          >
            {config.links.map((link) => (
              <NavbarLink key={link.url} href={link.url}>
                {link.title}
              </NavbarLink>
            ))}
            <div
              display="flex"
              flexDirection="row"
              gap="2"
            >
              <Link href="https://www.linkedin.com/in/mitchell-joram/" passHref>
                <a width='30px' height='30px' position='relative'>
                  <Image src="/social/linkedin.png" alt="LinkedIn" layout='fill'/>
                </a>
              </Link>
              <Link href="https://github.com/mitchelljoram" passHref>
                <a  width='28px' height='28px' position='relative'>
                  <Image src="/social/github.png" alt="Github" layout='fill'/>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/*<ModeToggle ml="10" />*/}
      </div>
    </header>
  )
}