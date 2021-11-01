import { useRoute } from "@/builder/hooks";
import { supabase } from "@/lib/supabase";
import { bgColor } from "@/theme/colors";
import { PageProps } from "@/types/pages";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Heading, HStack, Link } from "@chakra-ui/layout";
import { Container, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, memo } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { MdPublic } from "react-icons/md";
import PageSettings from "../components/dialogs/page-settings";
import { UserMenu } from "../components/dialogs/user-menu";
import { useBuilderStore } from "../store/use-builder";

interface HeaderProps {
  title: string;
}

const savePage = async (page: PageProps) => {
  await supabase
    .from("pages")
    .update({
      title: page.title,
      icon: page.icon,
      slug: page.slug,
      sections: page.sections,
      published: page.published,
      updated_at: new Date(),
    })
    .match({ id: page.id });
};

const Header: FC<HeaderProps> = ({ title }) => {
  const { isEditor } = useRoute();

  const settingsModal = useDisclosure();

  return (
    <Container
      as="header"
      position="sticky"
      {...bgColor}
      py={6}
      maxW="container.lg"
      transitionDuration="normal"
      top={0}
      left={0}
      zIndex="sticky"
    >
      <HStack spacing={{ base: 2, md: 4 }} justify="space-between">
        <HStack spacing={4}>
          <NextLink href="/build" passHref>
            <IconButton
              as={Link}
              variant="ghost"
              aria-label="Go home"
              icon={<Icon as={AiFillHome} />}
            />
          </NextLink>
          <Heading
            d={{ base: "none", md: "block" }}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            {title}
          </Heading>
        </HStack>
        <HStack>
          {isEditor && (
            <>
              <IconButton
                colorScheme="primary"
                variant="outline"
                icon={<Icon as={BsGearFill} />}
                aria-label="Open page settings"
                onClick={settingsModal.onOpen}
              />
              <PublishButton />
            </>
          )}

          <PageSettings modal={settingsModal} />
          <UserMenu />
        </HStack>
      </HStack>
    </Container>
  );
};

export default memo(Header);

const PublishButton = () => {
  const page = useBuilderStore((state) => state.page);

  return (
    <ButtonGroup isAttached colorScheme="primary">
      <Button
        leftIcon={<Icon as={MdPublic} />}
        aria-label="Publish page"
        onClick={() => savePage(page)}
      >
        Publish
      </Button>
      <IconButton aria-label="Publish options" icon={<FiChevronDown />} />
    </ButtonGroup>
  );
};
