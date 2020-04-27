import React from "react"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import {
  Box,
  Flex,
  Button,
  Heading,
  Icon,
  useColorMode,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/core"
import ColorModeIcon from "../assets/svg/color-mode.svg"

export default function Header({ heading, subtitle }) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box id="header" as="header" pt="4">
      <Box maxWidth="var(--max-width)" width="var(--width)" m="0 auto">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          py="4"
          as="nav"
        >
          <Button mr="4" variant="link" as={Link} to="/">
            Nick Wallentin
          </Button>
          <Flex flex="1">
            <Button variant="ghost" as={Link} to="/">
              Blog
            </Button>
            <Button variant="ghost" as={Link} to="/">
              About
            </Button>
            <Button variant="ghost" as={Link} to="/">
              Projects
            </Button>
          </Flex>
          <Flex>
            <motion.div
              initial={false}
              animate={colorMode === "light" ? { rotate: 180 } : { rotate: 0 }}
            >
              <Box size="20px" onClick={toggleColorMode}>
                <ColorModeIcon fill="var(--c-subtle)"></ColorModeIcon>
              </Box>
            </motion.div>
          </Flex>
        </Flex>
        <Box py={24}>
          <Breadcrumb
            spacing="8px"
            mb="2"
            separator={
              <Icon color="var(--c-subtle)" name="chevron-right"></Icon>
            }
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading as="h1" size="2xl">
            {heading}
          </Heading>
          <Text mt="4" color="var(--c-subtle)">
            {subtitle}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
