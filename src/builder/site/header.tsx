import { PageProps } from "@/types/pages";
import { signIn, useUser } from "@/utils/auth";
import { Button } from "@chakra-ui/button";
import { Heading, HStack, Link } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { UserMenu } from "../components/dialogs/user-menu";

interface HeaderProps {
  page: PageProps;
}

export const HomeHeader: FC<HeaderProps> = ({ page }) => {
  const { user } = useUser();

  return (
    <Container as="header" py={4} maxW="container.lg">
      <HStack justify="space-between">
        <HStack spacing={{ base: 2, md: 4 }}>
          <NextLink href="/" passHref>
            <Link variant="button">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
              >{`${page.icon} ${page.title}`}</Heading>
            </Link>
          </NextLink>
        </HStack>
        {user ? (
          <HStack spacing={4}>
            <NextLink href="/build" passHref>
              <Button as={Link} colorScheme="primary" variant="outline">
                Dashboard
              </Button>
            </NextLink>
            <UserMenu />
          </HStack>
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
    </Container>
  );
};
