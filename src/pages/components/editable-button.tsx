import { useBuilderStore } from "@/builder/store/use-builder";
import { useRoute } from "@/builder/hooks";
import { bgColor } from "@/theme/colors";
import { SectionProps } from "@/types/sections";
import { Box, Link, Stack } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC } from "react";
import NextLink from "next/link";

export const EditableButton: FC<{ section: SectionProps }> = ({ section }) => {
  const { updateSection } = useBuilderStore();

  const { isEditor } = useRoute();

  const button = section.hero.button;

  if (!button) return null;

  return (
    <>
      {isEditor ? (
        <Box>
          <Popover isLazy>
            <PopoverTrigger>
              <Box>
                <Button colorScheme="primary">{button.text}</Button>
              </Box>
            </PopoverTrigger>
            <PopoverContent {...bgColor}>
              <PopoverCloseButton />
              <PopoverHeader>Button</PopoverHeader>
              <PopoverBody>
                <Stack>
                  <FormControl id="button-text">
                    <FormLabel>Text</FormLabel>
                    <Input
                      variant="flushed"
                      defaultValue={button.text}
                      onBlur={(e) => {
                        updateSection({
                          id: section.id,
                          type: "hero-button-text",
                          content: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id="button-link">
                    <FormLabel>Link</FormLabel>
                    <Input
                      variant="flushed"
                      defaultValue={button.url}
                      onBlur={(e) => {
                        updateSection({
                          id: section.id,
                          type: "hero-button-link",
                          content: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      ) : button.isInternal ? (
        <NextLink href={button.url} passHref>
          <Button as={Link} colorScheme="primary">
            {button.text}
          </Button>
        </NextLink>
      ) : (
        <Button as={Link} href={button.url} colorScheme="primary">
          {button.text}
        </Button>
      )}
    </>
  );
};
