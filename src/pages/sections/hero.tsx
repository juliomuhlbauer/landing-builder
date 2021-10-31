import { useBuilderStore } from "@/builder/store/use-builder";
import { EditableButton } from "@/pages/components/editable-button";
import EditableIllustration from "@/pages/components/editable-illustration";
import EditableText from "@/pages/components/editable-text";
import { useRoute } from "@/builder/hooks";
import { HeroProps } from "@/types/sections";
import { Stack } from "@chakra-ui/layout";
import { FC, useCallback } from "react";
import SectionWrapper from "../layout/section-wrapper";

interface HeroSectionProps {
  section: HeroProps;
  index: number;
}

const Hero: FC<HeroSectionProps> = ({ section, index }) => {
  const { updateSection } = useBuilderStore();

  const isOdd = index % 2 === 0;

  const { isEditor } = useRoute();

  const updateTitle = useCallback(
    (title: string) => {
      updateSection({
        id: section.id,
        type: "hero-title",
        content: title,
      });
    },
    [section.id, updateSection]
  );

  const updateSubTitle = useCallback(
    (subtitle: string) => {
      updateSection({
        id: section.id,
        type: "hero-subtitle",
        content: subtitle,
      });
    },
    [section.id, updateSection]
  );

  return (
    <SectionWrapper section={section}>
      <Stack
        spacing={{ base: 2, md: 4 }}
        align="center"
        direction={{ base: "column", md: isOdd ? "row" : "row-reverse" }}
      >
        <Stack
          maxW="container.sm"
          flex="2"
          align={{ base: "center", md: "start" }}
          spacing={4}
        >
          <EditableText
            fontWeight="extrabold"
            textAlign={{ base: "center", md: "start" }}
            size="2xl"
            onBlur={(e) => {
              isEditor && updateTitle(e.target.innerText);
            }}
          >
            {section.hero.title}
          </EditableText>
          <EditableText
            fontWeight="medium"
            textAlign={{ base: "center", md: "start" }}
            size="md"
            onBlur={(e) => {
              isEditor && updateSubTitle(e.target.innerText);
            }}
          >
            {section.hero.subtitle}
          </EditableText>

          {section.hero.button && <EditableButton section={section} />}
        </Stack>
        <EditableIllustration flex="1" section={section} />
      </Stack>
    </SectionWrapper>
  );
};

export default Hero;
