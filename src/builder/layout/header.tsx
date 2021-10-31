import { useRoute } from "@/builder/hooks";
import { supabase } from "@/lib/supabase";
import { bgColor } from "@/theme/colors";
import { PageProps } from "@/types/pages";
import { signOut, useUser } from "@/utils/auth";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Heading, HStack, Link, Text } from "@chakra-ui/layout";
import { Avatar, Box, Container, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, memo } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill, BsGearFill } from "react-icons/bs";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { MdPublic } from "react-icons/md";
import PageSettings from "../components/dialogs/page-settings";
import { useBuilderStore } from "../store/use-builder";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface HeaderProps {
  title: string;
}

const savePage = async (page: PageProps) => {
  await supabase
    .from("Pages")
    .update({
      title: page.title,
      icon: page.icon,
      slug: page.slug,
      sections: page.sections,
      published: page.published,
      updatedAt: new Date(),
    })
    .match({ id: page.id });
};

const Header: FC<HeaderProps> = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isEditor } = useRoute();

  const settingsModal = useDisclosure();

  const { user } = useUser();

  const router = useRouter();

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
          <IconButton
            variant="ghost"
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            icon={
              <Icon
                as={colorMode === "light" ? BsFillMoonFill : BsFillSunFill}
              />
            }
          />
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
          <Box>
            <Menu>
              <MenuButton
                as={Avatar}
                name={user?.user_metadata?.full_name}
                src={user?.user_metadata.avatar_url}
                cursor="pointer"
                ring={2}
                ringColor="primary.200"
              />

              <MenuList>
                <MenuGroup fontSize="lg" title="Profile">
                  <MenuItem>
                    <HStack spacing={4}>
                      <Avatar
                        name={user?.user_metadata?.full_name}
                        size="md"
                        src={user?.user_metadata?.avatar_url}
                        objectFit="contain"
                      />
                      <Text fontSize="lg" fontWeight="semibold">
                        {user?.user_metadata?.full_name}
                      </Text>
                    </HStack>
                  </MenuItem>
                </MenuGroup>

                <MenuDivider />

                <MenuItem
                  icon={<Icon as={FiLogOut} boxSize={5} />}
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                >
                  SignOut
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
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
