// libraries
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { getMdxNode, getMdxPaths } from "next-mdx/server"
import { useHydrate } from "next-mdx/client"

// components
import { Layout } from "@/components/layout"
import { CanproCarousel, WorkoutCarousel } from "@/components/carousels"

// types
import { Page } from "src/types"

export const mdxComponents = {
  h2: (props) => <h2 {...props} />,
  a: (props) => (
    <a color="primary" _hover={{ textDecoration: "underline" }} {...props} />
  ),
  hr: (props) => <hr {...props} />,
  p: (props) => <p variant="text.paragraph" {...props} />,
  ul: (props) => <ul variant="list.unordered" {...props} />,
  ol: (props) => <ol variant="list.ordered" {...props} />,
  strong: (props) => <strong fontWeight="semibold" {...props} />,
  inlineCode: (props) => <code color="primary" fontSize="xl" {...props} />,
  div: (props) => <div {...props} />,
  img: (props) => <Image {...props} />,

  CanproCarousel: (props) => <CanproCarousel {...props} />,
  WorkoutCarousel: (props) => <WorkoutCarousel {...props} />,
}

export function Alert({ text }) {
  return <p>{text}</p>
}

export interface PageProps {
  page: Page
}

export default function PostPage({ page }: PageProps) {
  const content = useHydrate(page, {
    components: mdxComponents,
  })

  return (
    <Layout>
      <article>
        <div>
          <h1>{page.frontMatter.title}</h1>
          {page.frontMatter.excerpt ? <p>{page.frontMatter.excerpt}</p> : null}
          <hr />
          {content}
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("page"),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const page = await getMdxNode("page", context, {
    components: mdxComponents,
  })

  return {
    props: {
      page,
    },
  }
}
