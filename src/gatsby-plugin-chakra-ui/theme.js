import React from "react"
import { theme } from "@chakra-ui/core"

const customIcons = {
  colorMode: {
    path: (
      <path
        fill="currentColor"
        d="M12,24c-6.627,0 -12,-5.373 -12,-12c0,0 0,0 0,0c0,-6.623 5.377,-12 12,-12c6.623,0 12,5.377 12,12c0,6.602 -5.331,11.958 -11.922,12l-0.078,0Zm9,-12c0,-4.967 -4.033,-9 -9,-9c-4.967,0 -9,4.033 -9,9l0,0l18,0Z"
      />
    ),
  },
}

const newTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons,
  },
}
export default newTheme
