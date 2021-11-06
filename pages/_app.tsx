import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { UserContextProvider } from "@/utils/auth";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Landing Builder</title>
      </Head>
      <ChakraProvider theme={theme}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ChakraProvider>
    </>
  );
}
export default App;
