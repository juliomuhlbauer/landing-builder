import { SectionProps } from "@/types/sections";
import { Stack, Text } from "@chakra-ui/layout";
import { FC } from "react";
import Hero from "./hero";

interface SectionsRendererProps {
  sections: SectionProps[];
}

const Sections: FC<SectionsRendererProps> = ({ sections }) => {
  return (
    <Stack spacing={16}>
      {sections.map((section, index) => (
        <Switcher key={section.id} section={section} index={index} />
      ))}
    </Stack>
  );
};

interface SwitcherProps {
  section: SectionProps;
  index: number;
}

const Switcher: FC<SwitcherProps> = ({ section, index }) => {
  switch (section.type) {
    case "hero":
      return <Hero section={section} index={index} />;
    default:
      return <Text> This type is not supported </Text>;
  }
};

export default Sections;
