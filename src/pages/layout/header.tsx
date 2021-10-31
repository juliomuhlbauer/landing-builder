import { useRoute } from "@/builder/hooks";
import { PageProps } from "@/types/pages";
import { Button } from "@chakra-ui/button";
import { Heading, HStack, Link } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

interface HeaderProps {
  page: PageProps;
}

const Header: FC<HeaderProps> = ({ page }) => {
  const { isEditor } = useRoute();

  return (
    <Container as="header" py={4} maxW="container.lg">
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

        <Button colorScheme="primary">Get started</Button>
      </HStack>
    </Container>
  );
};

export default Header;
