import { useRoute } from "@/builder/hooks";
import { useBuilderStore } from "@/builder/store/use-builder";
import { bgColor } from "@/theme/colors";
import { SectionProps } from "@/types/sections";
import { Box, Link } from "@chakra-ui/layout";
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
import NextLink from "next/link";
import { FC } from "react";
import { usePage } from "../utils/use-page";

export const EditableButton: FC<{ section: SectionProps }> = ({ section }) => {
  const { updateSection } = useBuilderStore();

  const { product } = usePage();

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
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      ) : button.isInternal ? (
        <NextLink href={product.link} passHref>
          <Button as={Link} colorScheme="primary" rounded="full">
            {button.text}
          </Button>
        </NextLink>
      ) : (
        <Button
          as={Link}
          href={product.link}
          colorScheme="primary"
          rounded="full"
        >
          {button.text}
        </Button>
      )}
    </>
  );
};
