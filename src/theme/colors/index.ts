import { ChakraProps, ThemeTypings } from "@chakra-ui/system";

interface ColorProps {
  _light: ChakraProps;
  _dark: ChakraProps;
  transitionDuration: "normal";
  transitionProperty: "colors";
}

export const color = (
  type: keyof ChakraProps,
  lightColor: ThemeTypings["colors"],
  darkColor: ThemeTypings["colors"]
): ColorProps => {
  return {
    _light: { [type]: lightColor || "white" },
    _dark: { [type]: darkColor || "gray.800" },
    transitionDuration: "normal",
    transitionProperty: "colors",
  };
};

export const bgColor = color("bgColor", "white", "gray.800");

export const borderColor = color("borderColor", "gray.200", "gray.600");
