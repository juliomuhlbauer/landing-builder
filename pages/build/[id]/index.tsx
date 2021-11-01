import BuilderLayout from "@/builder/layout";
import { useBuilderStore } from "@/builder/store/use-builder";
import SkeletonHero from "@/builder/components/skeleton-hero";
import { supabase } from "@/lib/supabase";
import PageLayout from "@/pages/layout";
import Sections from "@/pages/sections";
import { PageProps } from "@/types/pages";
import { Center, Container, Stack, Text } from "@chakra-ui/layout";
import { Box, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/auth";

const BuildPage = () => {
  const router = useRouter();

  const page = useBuilderStore((state) => state.page);
  const setPage = useBuilderStore((state) => state.setPage);

  const [isLoading, setLoading] = useState(true);

  const { userId } = useUser();

  useEffect(() => {
    const getPages = async () => {
      const { data, error } = await supabase
        .from<PageProps>("pages")
        .select()
        .match({ slug: router.query.id, user: userId })
        .single();
      if (error || data === null) {
        console.error(error);
      } else {
        setPage(data);
        setLoading(false);
      }
    };
    if (router.query.id && userId) {
      getPages();
    }
  }, [router, setPage, userId]);

  return (
    <>
      <BuilderLayout title="Editor">
        {isLoading ? (
          <Container maxW="container.lg">
            <Stack spacing={8}>
              <Skeleton height={16} />
              <SkeletonHero />
            </Stack>
          </Container>
        ) : (
          <PageLayout page={page}>
            <Box my={8}>
              <Sections sections={page.sections} />
            </Box>
            <AddSection />
          </PageLayout>
        )}
      </BuilderLayout>
    </>
  );
};

export default BuildPage;

const AddSection = () => {
  const { addSection } = useBuilderStore();

  return (
    <Center
      my={16}
      rounded="lg"
      sx={{
        outlineColor: "gray.500",
        outlineStyle: "dashed",
      }}
      cursor="pointer"
      onClick={addSection}
      w="100%"
      h={48}
    >
      <Text fontSize="xl" fontWeight="semibold">
        Add Section
      </Text>
    </Center>
  );
};
