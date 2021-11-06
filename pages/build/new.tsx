import BuilderLayout from "@/builder/layout";
import { useBuilderStore } from "@/builder/store/use-builder";
import { borderColor } from "@/theme/colors";
import { useUser } from "@/utils/auth";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Stack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useRouter } from "next/router";
import { useState } from "react";

const NewPage = () => {
  const { createPage } = useBuilderStore();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { userId } = useUser();

  const product = {
    name,
    link,
    category,
    description,
  };

  return (
    <BuilderLayout title="New page">
      <Center my={8}>
        <Stack
          spacing={6}
          p={8}
          w="md"
          borderWidth={1}
          {...borderColor}
          rounded="md"
          boxShadow="lg"
        >
          <Heading size="lg">What is your product?</Heading>
          <FormControl id="product_name">
            <FormLabel>Name</FormLabel>
            <Input
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="product_link">
            <FormLabel>Link</FormLabel>
            <Input
              autoComplete="off"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormControl>

          <FormControl id="product_category">
            <FormLabel>Category</FormLabel>
            <Input
              autoComplete="off"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>

          <FormControl id="product_description">
            <FormLabel>Description</FormLabel>
            <Input
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Button
            onClick={() => {
              userId &&
                createPage({ user: userId, product })
                  .then((response) => {
                    if (response !== null) {
                      router.push(`/build/${response.slug}`);
                      confetti();
                    } else router.push("/build");
                  })
                  .catch((error) => {
                    alert("create page error:" + error.message);
                    router.push("/build");
                  });
            }}
            colorScheme="primary"
          >
            Create
          </Button>
        </Stack>
      </Center>
    </BuilderLayout>
  );
};

export default NewPage;
