import { useBuilderStore } from "@/builder/store/use-builder";
import { supabase } from "@/lib/supabase";
import { bgColor } from "@/theme/colors";
import { PageProps } from "@/types/pages";
import { Button } from "@chakra-ui/button";
import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { Link, Stack } from "@chakra-ui/layout";
import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
    .from("Pages")
    .update({
      title,
      icon,
      slug,
      published,
      updatedAt: new Date(),
    })
    .match({ id });
};

const checkSlug = async (slug: string) => {
  const { data, error } = await supabase
    .from<PageProps>("Pages")
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

  console.log(pagePublished);

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
      <ModalContent {...bgColor} pb={32}>
        <ModalHeader>Page settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
              <Input
                value={icon}
                onChange={(e) => {
                  const input = e.target.value;
                  const text = input.charAt(1);
                  if (text) {
                    setIcon(text);
                  }
                }}
                type="text"
                autoComplete="off"
              />
            </FormControl>

            <Checkbox
              isChecked={published}
              onChange={(e) => {
                setPublished(e.target.checked);
              }}
            >
              Published
            </Checkbox>

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
