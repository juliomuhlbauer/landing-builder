import { extendTheme } from "@chakra-ui/react";
import { theme as base, ThemeConfig } from "@chakra-ui/theme";
import { globalStyles } from "./styles/global-styles";
import components from "./components";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: `Inter, ${base.fonts.heading}`,
  body: `Inter, ${base.fonts.body}`,
};

const colors = {
  primary: base.colors.cyan,
};

const theme = extendTheme({
  config,
  fonts,
  colors,
  components,
  styles: globalStyles,
  shadows: {
    outline: `0 0 0 1px ${colors.primary[400]}`,
  },
});

export default theme;
