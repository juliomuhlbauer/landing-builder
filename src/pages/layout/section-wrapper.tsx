import { useBuilderStore } from "@/builder/store/use-builder";
import { useRoute } from "@/builder/hooks";
import { bgColor } from "@/theme/colors";
import { SectionProps } from "@/types/sections";
import { sectionNames } from "@/utils";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Heading } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { FC } from "react";
import { BsTrash } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

const SectionWrapper: FC<{ section: SectionProps }> = ({
  children,
  section,
}) => {
  const { removeSection, addButton } = useBuilderStore();
  const { isBuilder } = useRoute();

  return (
    <Box as="section" role="group" rounded="sm" position="relative">
      {isBuilder && (
        <HStack
          w="100%"
          boxShadow="md"
          h={10}
          p={2}
          rounded="md"
          pos="absolute"
          bottom={-12}
          _groupHover={{
            display: "flex",
          }}
          _groupActive={{
            display: "flex",
          }}
          {...bgColor}
          justify="space-between"
        >
          <Heading size="xl">{sectionNames[section.type]}</Heading>
          <HStack>
            <IconButton
              variant="ghost"
              aria-label="Add hero button"
              icon={<Icon as={MdAdd} />}
              onClick={() => addButton(section.id)}
            />
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Remove section"
              icon={<Icon as={BsTrash} />}
              onClick={() => removeSection(section.id)}
            />
          </HStack>
        </HStack>
      )}
      {children}
    </Box>
  );
};

export default SectionWrapper;
