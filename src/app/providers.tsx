"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#E6F7F7",
      100: "#C3EDE6",
      200: "#9FE2D6",
      300: "#7CD7C5",
      400: "#5CCDB6",
      500: "#3FCCAB",
      600: "#38BA99",
      700: "#31A985",
      800: "#2A9271",
      900: "#236F5C",
    },
    secondary: {
      50: "#F3F3F3",
      100: "#DCDCDC",
      200: "#C4C4C4",
      300: "#ADADAD",
      400: "#959595",
      500: "#7E7E7E",
      600: "#6E6E6E",
      700: "#5E5E5E",
      800: "#4F4F4F",
      900: "#3F3F3F",
    },
  },
  shadows: {
    outline: "0 0 0 3px primary.500",
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            bgColor: 'white',
            height: '60px',
            _focus: {
              borderColor: "primary.500",
              boxShadow: "primary.500"
            }
          }
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
