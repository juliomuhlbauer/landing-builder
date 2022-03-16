import { extendTheme } from "@chakra-ui/react";
import { theme as base, ThemeConfig } from "@chakra-ui/theme";
import { globalStyles } from "./styles/global-styles";
import components from "./components";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const fonts = {
  heading: `Inter, ${base.fonts.heading}`,
  body: `Inter, ${base.fonts.body}`,
};

const colors = {
  primary: base.colors.cyan,
};

export const theme = extendTheme({
  config,
  fonts,
  colors,
  components,
  styles: globalStyles,
  shadows: {
    outline: `0 0 0 1px ${colors.primary[400]}`,
  },
});

const pagesConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

import {
  Styles,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

export const pageGlobalStyles: Styles = {
  global: (props) => ({
    "*": {
      boxSizing: "border-box",
    },
    html: {
      scrollBehavior: "smooth",
      WebkitTapHighlightColor: "transparent",
    },
    body: {
      color: "gray.700",
      bgColor: "white",
    },

    _selection: {
      color: "white",
      background: "primary.500",
    },
    ...pageScrollbar(props),
    ...nProgress,
  }),
};

const pageScrollbar: SystemStyleFunction = (props) => ({
  "@media (pointer: fine)": {
    "::-webkit-scrollbar": {
      w: "5px",
      h: "5px ",
    },
    "::-webkit-scrollbar-thumb": {
      rounded: "5px",
      bgColor: "gray.400",
    },
    "::-webkit-scrollbar-thumb:hover": {
      bg: "primary.500",
    },
    "::-webkit-scrollbar-corner": {
      bg: "transparent",
    },
  },
});

const nProgress: SystemStyleObject = {
  "#nprogress": {
    pointerEvents: "none",
  },
  "#nprogress .bar": {
    bg: "primary.200",
    position: "fixed",
    zIndex: "2000",
    top: 0,
    left: 0,
    w: "100%",
    h: "1px",
  },
};

export const pagesTheme = extendTheme({
  pagesConfig,
  fonts,
  colors,
  components,
  styles: pageGlobalStyles,
  shadows: {
    outline: `0 0 0 1px ${colors.primary[400]}`,
  },
});
