import PageMenu from "@/builder/components/dialogs/page-menu";
import BuilderLayout from "@/builder/layout";
import { useDashboardStore } from "@/builder/store/use-dashboard";
import { supabase } from "@/lib/supabase";
import { borderColor } from "@/theme/colors";
import { PageProps } from "@/types/pages";
import { useUser } from "@/utils/auth";
import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import {
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

const HomeBuild = () => {
  const { pages, setPages } = useDashboardStore();

  const router = useRouter();

  const { userId } = useUser();

  useEffect(() => {
    async function getPages() {
      const { data, error } = await supabase
        .from<PageProps>("Pages")
        .select("title, id, slug, createdAt, updatedAt, icon, published")
        .match({ user: userId });
      if (error || data === null) {
        console.error(error);
      } else {
        setPages(data);
      }
    }
    if (userId) {
      getPages();
    }
  }, [router, userId]);

  return (
    <>
      <Head>
        <title>Pages</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <BuilderLayout title="Pages">
        <Stack spacing={8}>
          <HStack align="start">
            <Input
              _focus={{
                borderColor: "primary.600",
              }}
              placeholder="Search..."
              flex="1"
            />
            <NextLink href="/build/new" passHref>
              <Button
                as={Link}
                aria-label="Add page"
                leftIcon={<Icon as={AiOutlinePlus} />}
                colorScheme="primary"
              >
                Create page
              </Button>
            </NextLink>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {pages.map((page) => (
              <NextLink key={page.id} href={`/build/${page.id}`} passHref>
                <Link
                  boxShadow="sm"
                  p={4}
                  rounded="lg"
                  borderWidth={1}
                  {...borderColor}
                  _hover={{
                    borderColor: "primary.600",
                  }}
                  onContextMenu={(e) => {
                    // e.preventDefault();
                  }}
                >
                  <HStack justify="space-between">
                    <HStack>
                      <chakra.span fontSize="2xl">{page.icon}</chakra.span>
                      <Stack>
                        <Heading
                          size="lg"
                          {...(!page.title && {
                            color: "gray.500",
                          })}
                          noOfLines={1}
                        >
                          {page.title ? page.title : "Page"}
                        </Heading>

                        <Text
                          maxW="24ch"
                          isTruncated
                          {...(!page.slug && {
                            color: "gray.500",
                          })}
                        >{`/${page.slug}`}</Text>
                      </Stack>
                    </HStack>
                    <HStack>
                      <IconButton
                        icon={<Icon as={FiExternalLink} />}
                        href={`/page/${page.id}`}
                        isExternal
                        aria-label="View page"
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(`/page/${page.slug}`, "_blank")?.focus();
                        }}
                      />

                      <PageMenu page={page} />
                    </HStack>
                  </HStack>
                </Link>
              </NextLink>
            ))}
          </SimpleGrid>
        </Stack>
      </BuilderLayout>
    </>
  );
};

export default HomeBuild;
