import React, { useEffect } from "react"
import rehypeReact from "rehype-react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import Sticky from "react-sticky-el"
import scrollTo from "gatsby-plugin-smoothscroll"

//this component handles the blur img & fade-ins
import Img from "gatsby-image"
import {
  Grid,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  Icon,
} from "@chakra-ui/core"

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
      heading.setAttribute(
        "id",
        heading.innerText.toLowerCase().replace(/\s+/g, "-")
      )
      console.log(heading.innerText)
    })
  })

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
    <Heading as="h3" size="lg" mb="5" mt="10">
      {children}
    </Heading>
  )
  const StyledText = ({ children }) => <Text mb="6">{children}</Text>

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      h1: Styledh1,
      h2: Styledh2,
      h3: Styledh3,
      p: StyledText,
    },
  }).Compiler

  return (
    <Layout heading={data.frontmatter.title} subtitle="This is the subtitle">
      <Grid gridTemplateColumns="1fr 300px" gridGap="20">
        <article id="intro">
          <Box>{renderAst(data.htmlAst)}</Box>
        </article>
        <Box>
          <Sticky topOffset={-80} stickyStyle={{ top: "80px" }}>
            <Heading mb="4" as="h4" size="md">
              Table of contents
            </Heading>
            <List>
              <ListItem fontSize="1rem">
                <Button
                  as="a"
                  variant="link"
                  color="var(--c-subtle)"
                  fontWeight="normal"
                  style={{ cursor: "pointer" }}
                  onClick={() => scrollTo("#intro")}
                >
                  Introduction
                </Button>
              </ListItem>
              {data.headings.map((heading, index) => (
                <ListItem
                  key={index + heading}
                  mt={heading.depth === 3 ? "1" : "2"}
                  ml={heading.depth === 3 ? "1" : "0"}
                >
                  <Text isTruncated>
                    <Button
                      as="a"
                      variant="link"
                      fontSize={heading.depth === 3 ? "0.9rem" : "1rem"}
                      color="var(--c-subtle)"
                      fontWeight="normal"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        scrollTo(
                          "#" + heading.value.toLowerCase().replace(/\s+/g, "-")
                        )
                      }
                    >
                      {heading.depth === 3 && (
                        <Icon mr="2" name="chevron-right" />
                      )}
                      {heading.value}
                    </Button>
                  </Text>
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
