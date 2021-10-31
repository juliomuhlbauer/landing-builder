import { showcase } from "@/data";
import { supabase } from "@/lib/supabase";
import PageLayout from "@/pages/layout";
import NotFound from "@/pages/layout/404";
import Sections from "@/pages/sections";
import { PageProps } from "@/types/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";

interface LivePageProps {
  page: PageProps;
}

const LivePage: FC<LivePageProps> = ({ page }) => {
  if (!page) return <NotFound />;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link
          rel="shortcut icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon}</text></svg>`}
        />
      </Head>

      <PageLayout page={page}>
        <Sections sections={page.sections} />
      </PageLayout>
    </>
  );
};

export default LivePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, error } = await supabase
    .from<PageProps>("Pages")
    .select()
    .match({ slug: context.params?.slug, published: true })
    .single();

  return {
    props: {
      page: data,
    },

    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = showcase.map((page) => ({
    params: {
      slug: page.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};