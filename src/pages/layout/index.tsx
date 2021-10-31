import { PageProps } from "@/types/pages";
import { Box, Container } from "@chakra-ui/layout";
import { FC } from "react";
import Header from "./header";
import Head from "next/head";

interface PageLayoutProps {
  page: PageProps;
}

const PageLayout: FC<PageLayoutProps> = ({ children, page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link
          rel="shortcut icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon}</text></svg>`}
        />
      </Head>
      <Header page={page} />
      <Container maxW="container.lg">
        <Box as="main" my={8}>
          {children}
        </Box>
      </Container>
    </>
  );
};

export default PageLayout;
