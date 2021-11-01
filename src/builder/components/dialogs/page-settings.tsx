import { useBuilderStore } from "@/builder/store/use-builder";
import { supabase } from "@/lib/supabase";
import { bgColor } from "@/theme/colors";
import { PageProps } from "@/types/pages";
import { Button } from "@chakra-ui/button";
import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { Link, Stack } from "@chakra-ui/layout";
import {
  chakra,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { FC, memo, useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

interface PageSettingsProps {
  modal: UseDisclosureReturn;
}

const savePage = async ({
  title,
  icon,
  slug,
  id,
  published,
}: Partial<PageProps>) => {
  await supabase
    .from("pages")
    .update({
      title,
      icon,
      slug,
      published,
      updated_at: new Date(),
    })
    .match({ id });
};

const checkSlug = async (slug: string) => {
  const { data, error } = await supabase
    .from<PageProps>("pages")
    .select()
    .match({ slug })
    .single();
  if (data !== null && data.slug) {
    return false;
  }
  return true;
};

const PageSettings: FC<PageSettingsProps> = ({ modal }) => {
  const pageTitle = useBuilderStore((state) => state.page.title);
  const pageIcon = useBuilderStore((state) => state.page.icon);
  const pageSlug = useBuilderStore((state) => state.page.slug);
  const pageId = useBuilderStore((state) => state.page.id);
  const pagePublished = useBuilderStore((state) => state.page.published);

  const updatePage = useBuilderStore((state) => state.updatePage);

  const [title, setTitle] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);

  const [isValid, setValid] = useState(false);

  useEffect(() => {
    setTitle(pageTitle);
    setIcon(pageIcon);
    setSlug(pageSlug);
    setPublished(pagePublished);
  }, [modal.isOpen, pageIcon, pagePublished, pageSlug, pageTitle]);

  useEffect(() => {
    if (
      title === pageTitle &&
      icon === pageIcon &&
      slug === pageSlug &&
      published === pagePublished
    ) {
      setValid(false);
    } else setValid(true);
  }, [
    title,
    pageTitle,
    icon,
    pageIcon,
    slug,
    pageSlug,
    published,
    pagePublished,
  ]);

  return (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
      <ModalOverlay />
      <ModalContent {...bgColor}>
        <ModalHeader>Page settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={32}>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Page title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </FormControl>

            <FormControl id="icon">
              <FormLabel>Page icon</FormLabel>

              <Popover isLazy>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Pick a emoji"
                    icon={<chakra.span>{icon}</chakra.span>}
                  />
                </PopoverTrigger>
                <PopoverContent bg="transparent">
                  <Picker
                    onSelect={(emoji: BaseEmoji) => {
                      if (emoji.native) {
                        setIcon(emoji.native);
                      }
                    }}
                    emoji="point_up"
                    title="Pick a emoji"
                    theme="auto"
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormControl id="published">
              <FormLabel>Page url</FormLabel>
              <Input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                }}
                type="text"
                autoComplete="off"
              />
            </FormControl>

            <Checkbox
              size="lg"
              colorScheme="primary"
              isChecked={published}
              onChange={(e) => {
                setPublished(e.target.checked);
              }}
            >
              Published
            </Checkbox>

            <HStack justify="right">
              <Button
                as={Link}
                href={`/page/${pageSlug}`}
                isExternal
                rightIcon={<Icon as={FiExternalLink} />}
                variant="outline"
                colorScheme="primary"
              >
                View
              </Button>
              <Button
                colorScheme="primary"
                isDisabled={!isValid}
                onClick={() => {
                  if (isValid) {
                    if (slug !== pageSlug) {
                      checkSlug(slug).then((exists) => {
                        if (!exists) {
                          alert("Slug already exists");
                        } else {
                          updatePage({
                            title,
                            icon,
                            slug,
                            published,
                          });
                          savePage({
                            title,
                            icon,
                            slug,
                            id: pageId,
                            published,
                          });
                        }
                      });
                    } else {
                      updatePage({
                        title,
                        icon,
                        slug,
                        published,
                      });
                      savePage({ title, icon, slug, id: pageId, published });
                    }
                  }
                }}
              >
                Save
              </Button>
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(PageSettings);
