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
import { pagesTheme } from "@/theme";

const BuildPage = () => {
  const router = useRouter();

  const page = useBuilderStore((state) => state.page);
  const setPage = useBuilderStore((state) => state.setPage);

  const [isLoading, setLoading] = useState(true);

  const { userId } = useUser();

  const slug = router.query.build;

  useEffect(() => {
    const getPage = async () => {
      const { data, error } = await supabase
        .from<PageProps>("pages")
        .select()
        .match({ slug: slug, user: userId })
        .single();
      if (error || data === null) {
        alert(error?.message);
      } else {
        setPage(data);
        setLoading(false);
      }
    };
    if (slug && userId) {
      getPage();
    }
  }, [slug, setPage, userId]);

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
          <PageLayout page={page} theme={pagesTheme}>
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
