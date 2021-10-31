import { useBuilderStore } from "@/builder/store/use-builder";
import { useRoute } from "@/builder/hooks";
import { SectionProps } from "@/types/sections";
import { BoxProps } from "@chakra-ui/layout";
import {
  Box,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { FC } from "react";

interface EditableIllustrationProps extends BoxProps {
  section: SectionProps;
}

const EditableIllustration: FC<EditableIllustrationProps> = ({
  section,
  ...rest
}) => {
  const { isEditor } = useRoute();

  const { updateSection } = useBuilderStore();

  return (
    <Box {...rest}>
      {isEditor ? (
        <Popover isLazy>
          <PopoverTrigger>
            <Box pos="relative">
              <Illustration
                sx={{
                  ":hover, :focus": {
                    border: "none",
                    outline: "none",
                    ring: 2,
                    ringColor: "primary.600",
                  },
                }}
                section={section}
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Image</PopoverHeader>
            <PopoverBody>
              <Input
                variant="flushed"
                defaultValue={section.hero.image}
                onBlur={(e) => {
                  updateSection({
                    id: section.id,
                    type: "hero-image",
                    content: e.target.value,
                  });
                }}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Illustration section={section} />
      )}
    </Box>
  );
};

export default EditableIllustration;

interface IllustrationProps extends BoxProps {
  section: SectionProps;
}

const Illustration: FC<IllustrationProps> = ({ section, ...rest }) => {
  return (
    <Box
      p={1}
      rounded="sm"
      position="relative"
      // w={{ base: "sm", sm: "md" }}
      // h={{ base: "sm", sm: "md" }}
      w="sm"
      h="sm"
      {...rest}
    >
      <NextImage
        src={section.hero.image}
        alt={`Illustration ${section.hero.title}`}
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
};
