import React from "react"
import Layout from "../components/Layout"
import LatestPosts from "../components/LatestPosts"
import { Box, Grid, Flex } from "@chakra-ui/core"

export default function IndexPage() {
  return (
    <Layout page="home" heading="Hello world">
      <Grid gridTemplateColumns="3fr 1fr" gridGap="10">
        <LatestPosts />
        <Box>yo</Box>
      </Grid>
    </Layout>
  )
}
