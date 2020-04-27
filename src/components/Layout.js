import React from "react"
import Header from "./Header"
import Helmet from "react-helmet"
import useSiteMetadata from "../static_queries/useSiteMetadata"
import { Box, Flex } from "@chakra-ui/core"

export default function Layout(props) {
  const { title, description } = useSiteMetadata()
  return (
    <Box>
      <Header heading={props.heading} subtitle={props.subtitle} />
      <Box
        maxWidth="var(--max-width)"
        width="var(--width)"
        my={[5, 10, 20]}
        mx="auto"
        background="var(--bg-main)"
      >
        {props.children}
      </Box>
    </Box>
  )
}
