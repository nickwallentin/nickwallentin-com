import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"

import Img from "gatsby-image"
import { Heading, Box, Text, Button, Icon } from "@chakra-ui/core"

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const item = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }

export default function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
      <motion.div initial="hidden" animate="visible" variants={list}>
        <Heading color="var(--c-accent)" mb="10" size="md">
          Latest content
        </Heading>
        {blogData
          .filter(blog => blog.node.frontmatter.title !== "")
          .map(blog => {
            return (
              <Post variants={item} key={blog.node.id}>
                <motion.div whileHover="hover" animate="rest">
                  <Box
                    as={Link}
                    my="20"
                    display="block"
                    to={`/blog/${blog.node.fields.slug}`}
                  >
                    <Box as="li" key={blog.node.fields.slug}>
                      <Heading color="var(--c-heading)" size="lg" mb="1">
                        {blog.node.frontmatter.title}
                      </Heading>
                      <Text color="var(--c-subtle)" mb="4">
                        Sub title if exists
                      </Text>
                      <Text lineHeight="1.5">{blog.node.excerpt}</Text>
                    </Box>
                    <Button mt="6" variant="link">
                      Read more
                      <motion.div
                        variants={{
                          hover: {
                            x: 10,
                            opacity: 1,
                          },
                          rest: { opacity: 0 },
                        }}
                      >
                        <Icon
                          ml="2"
                          color="var(--c-accent)"
                          name="arrow-forward"
                        ></Icon>
                      </motion.div>
                    </Button>
                  </Box>
                </motion.div>
              </Post>
            )
          })}
      </motion.div>
    )
  }
  return (
    <section>
      <ul>{renderBlogData()}</ul>
    </section>
  )
}

const Post = styled(motion.div)`
  ${Link} {
    &:hover {
      a {
        button {
          text-decoration: none;
        }
      }
    }
  }
`
