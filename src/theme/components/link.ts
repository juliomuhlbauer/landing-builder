import { ComponentSingleStyleConfig } from "@chakra-ui/react";

const Link: ComponentSingleStyleConfig = {
  variants: {
    button: (props) => ({
      p: 2,
      _hover: {
        bg: `${props.theme.colors.primary[200]}12`,
        textDecoration: "none",
      },
      _active: {
        bg: `${props.theme.colors.primary[200]}24`,
      },
      rounded: "md",
    }),
  },
};

export default Link;
