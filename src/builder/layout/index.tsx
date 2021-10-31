import { signIn, useUser } from "@/utils/auth";
import { Button } from "@chakra-ui/button";
import { Box, Center, Container } from "@chakra-ui/layout";
import { FC } from "react";
import Header from "./header";
import { FcGoogle } from "react-icons/fc";

interface BuilderLayoutProps {
  title: string;
}

const BuilderLayout: FC<BuilderLayoutProps> = ({ children, title }) => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <>
          <Header title={title} />
          <Container maxW="container.lg">
            <Box as="main" my={2}>
              {children}
            </Box>
          </Container>
        </>
      ) : (
        <Center minH="100vh">
          <Button
            colorScheme="primary"
            variant="outline"
            leftIcon={<FcGoogle size={24} />}
            onClick={() => signIn()}
            size="lg"
          >
            Sign in with Google
          </Button>
        </Center>
      )}
    </>
  );
};

export default BuilderLayout;
