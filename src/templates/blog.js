import React, { useEffect } from "react"
import rehypeReact from "rehype-react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import Sticky from "react-sticky-el"

//this component handles the blur img & fade-ins
import Img from "gatsby-image"
import { Grid, Box, Heading, Text, List, ListItem } from "@chakra-ui/core"

export default function Blog(props) {
  const data = props.data.markdownRemark
  const allBlogData = useBlogData()
  const nextSlug = getNextSlug(data.fields.slug)

  function getNextSlug(slug) {
    const allSlugs = allBlogData.map(blog => {
      return blog.node.fields.slug
    })
    const nextSlug = allSlugs[allSlugs.indexOf(slug) + 1]
    if (nextSlug !== undefined && nextSlug !== "") {
      return nextSlug
    } else {
      return allSlugs[0]
    }
  }

  useEffect(() => {
    const headings = []
    const allHeadings = document.querySelectorAll("h2, h3")

    allHeadings.forEach((heading, index) => {
      heading.setAttribute("id", "heading-" + (index + 1))
    })
  }, [])

  const Styledh1 = ({ children }) => (
    <Heading as="h1" size="2xl" mb="10" mt="20">
      {children}
    </Heading>
  )
  const Styledh2 = ({ children }) => (
    <Heading as="h2" size="xl" mb="10" mt="20">
      {children}
    </Heading>
  )
  const Styledh3 = ({ children }) => (
    <Heading as="h3" size="lg" mb="10" mt="20">
      {children}
    </Heading>
  )
  const StyledText = ({ children }) => <Text mb="6">{children}</Text>

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      h1: Styledh1,
      h2: Styledh2,
      h3: Heading,
      p: StyledText,
    },
  }).Compiler

  return (
    <Layout heading={data.frontmatter.title} subtitle="This is the subtitle">
      <Grid gridTemplateColumns="3fr 1fr" gridGap="20">
        <article>
          <Box>{renderAst(data.htmlAst)}</Box>
        </article>
        <Box>
          <Sticky topOffset={-80} stickyStyle={{ top: "80px" }}>
            <Heading as="h4" size="md">
              Table of contents
            </Heading>
            <List styleType="disc">
              {data.headings.map(heading => (
                <ListItem fontSize="1rem" lineHeight="1.4">
                  {heading.value}
                </ListItem>
              ))}
            </List>
          </Sticky>
        </Box>
      </Grid>
    </Layout>
  )
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM Do, YYYY")
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      headings {
        value
        depth
      }
      htmlAst
    }
  }
`
