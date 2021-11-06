import { PageProps } from "@/types/pages";
import { Box, Container } from "@chakra-ui/layout";
import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import Head from "next/head";
import { FC, ReactElement } from "react";
import { PageProvider } from "../utils/page-context";
import Header from "./header";

interface PageLayoutProps {
  page: PageProps;
  header?: ReactElement;
  theme: ChakraProviderProps["theme"];
}

const PageLayout: FC<PageLayoutProps> = ({ children, page, header, theme }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link
          rel="shortcut icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon}</text></svg>`}
        />
      </Head>
      <ChakraProvider theme={theme}>
        <PageProvider page={page}>
          {header || <Header page={page} />}
          <Container maxW="container.lg">
            <Box as="main" my={8}>
              {children}
            </Box>
          </Container>
        </PageProvider>
      </ChakraProvider>
    </>
  );
};

export default PageLayout;
