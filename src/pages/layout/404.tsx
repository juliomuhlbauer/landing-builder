import { Center, Heading, Link } from "@chakra-ui/layout";
import { Button, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

const NotFound = () => {
  return (
    <Center minH="100vh">
      <Center as="section" minH="60vh">
        <Stack spacing={4}>
          <Heading
            fontSize={{ base: "6xl", md: "8xl" }}
            fontWeight="black"
            textAlign="center"
            bgGradient="linear(to-r, primary.200, primary.600)"
            bgClip="text"
          >
            404
          </Heading>
          <NextLink href="/" passHref>
            <Button
              as={Link}
              color="gray.800"
              fontSize="xl"
              fontWeight="black"
              bgGradient="linear(to-r, primary.200, primary.600)"
              _hover={{
                bg: "linear(to-r, primary.200, primary.600)",
              }}
              _active={{
                bg: "linear(to-r, primary.200, primary.600)",
              }}
            >
              Home
            </Button>
          </NextLink>
        </Stack>
      </Center>
    </Center>
  );
};

export default NotFound;
