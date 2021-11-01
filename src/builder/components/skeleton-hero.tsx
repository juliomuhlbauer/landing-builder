import { heroSample } from "@/utils";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";

const SkeletonHero = () => {
  const section = heroSample();

  const index = 0;

  const isOdd = index % 2 === 0;

  return (
    <Stack
      spacing={{ base: 2, md: 4 }}
      align="center"
      direction={{ base: "column", md: isOdd ? "row" : "row-reverse" }}
    >
      <Stack
        maxW="container.sm"
        flex="2"
        align={{ base: "center", md: "start" }}
        spacing={4}
      >
        <Skeleton>
          <Heading
            fontWeight="extrabold"
            textAlign={{ base: "center", md: "start" }}
            size="3xl"
          >
            {section.hero.title}
          </Heading>
        </Skeleton>
        <Skeleton>
          <Heading
            fontWeight="medium"
            textAlign={{ base: "center", md: "start" }}
            size="lg"
          >
            {section.hero.subtitle}
          </Heading>
        </Skeleton>
      </Stack>
      <Skeleton flex="1">
        <Box w={{ base: "sm", sm: "md" }} h={{ base: "sm", sm: "md" }} />
      </Skeleton>
    </Stack>
  );
};

export default SkeletonHero;
