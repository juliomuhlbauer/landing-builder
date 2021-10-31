import Sections from "@/pages/sections";
import { SectionProps } from "@/types/sections";
import { Box } from "@chakra-ui/layout";
import Head from "next/head";
import PageLayout from "@/pages/layout";
import { PageProps } from "@/types/pages";
import { HomeHeader } from "@/builder/home/header";

const sections: SectionProps[] = [
  {
    id: "b223c653-93a2-4913-8a18-65fea64a9e3a",
    hero: {
      image: "/samples/draw.png",
      title: "Build your product, we handle the rest",
      button: {
        text: "Get Started",
        url: "/build",
        isInternal: true,
      },
      subtitle:
        "Focus on building and improving, while we design your landing page.",
    },
    type: "hero",
  },
];

const page: PageProps = {
  title: "Landing builder",
  icon: "🚀",
  sections,
  slug: "",
  updatedAt: new Date(),
  createdAt: new Date(),
  id: "1",
  published: true,
  user: "eb26fd2f-f862-49ff-b87e-aa08fa8b8a22",
  product: {
    name: "Landing builder",
    pricing: "$5.90/mo",
    link: "/",
    description: "Build your product, we handle the rest",
  },
};

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Landing Builder</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PageLayout page={page} header={<HomeHeader page={page} />}>
        <Box my={16}>
          <Sections sections={sections} />
        </Box>
      </PageLayout>
    </>
  );
};

export default HomePage;
