import { useRoute } from "@/builder/hooks";
import { bgColor } from "@/theme/colors";
import { PageProps } from "@/types/pages";
import { signIn, useUser } from "@/utils/auth";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Heading, HStack, Link } from "@chakra-ui/layout";
import { Container, Avatar } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

interface HeaderProps {
  page: PageProps;
}

const Header: FC<HeaderProps> = ({ page }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isEditor } = useRoute();

  const { user } = useUser();

  return (
    <Container
      as="header"
      py={4}
      maxW="container.lg"
      //  {...bgColor}
    >
      <HStack justify="space-between">
        <HStack spacing={{ base: 2, md: 4 }}>
          {isEditor ? (
            <Link variant="button">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
              >{`${page.icon} ${page.title}`}</Heading>
            </Link>
          ) : (
            <NextLink href={`/page/${page.slug}`} passHref>
              <Link variant="button">
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                >{`${page.icon} ${page.title}`}</Heading>
              </Link>
            </NextLink>
          )}
        </HStack>
        <HStack>
          {!isEditor && (
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
          )}
          {user ? (
            <NextLink href="/build" passHref>
              <Button
                as={Link}
                colorScheme="primary"
                leftIcon={
                  <Avatar boxSize={8} src={user.user_metadata.avatar_url} />
                }
              >
                Start
              </Button>
            </NextLink>
          ) : (
            <Button
              colorScheme="primary"
              onClick={() => {
                signIn();
              }}
            >
              Get started
            </Button>
          )}
        </HStack>
      </HStack>
    </Container>
  );
};

export default Header;
