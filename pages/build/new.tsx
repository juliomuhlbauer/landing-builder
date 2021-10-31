import { useBuilderStore } from "@/builder/store/use-builder";
import { Center, Stack } from "@chakra-ui/layout";
import BuilderLayout from "@/builder/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useState } from "react";
import { borderColor } from "@/theme/colors";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";
import { useUser } from "@/utils/auth";

const NewPage = () => {
  const { createPage } = useBuilderStore();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  const router = useRouter();

  const { userId } = useUser();

  return (
    <BuilderLayout title="New page">
      <Center minH="2xl">
        <Stack
          spacing={6}
          p={8}
          w="md"
          borderWidth={1}
          {...borderColor}
          rounded="md"
          boxShadow="lg"
        >
          <FormControl id="title">
            <FormLabel>Page title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="icon">
            <FormLabel>Page icon</FormLabel>
            <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
          </FormControl>

          <Button
            onClick={() => {
              userId &&
                createPage({ title, icon, user: userId })
                  .then((response) => {
                    if (response !== null) {
                      router.push(`/build/${response.id}`);
                      confetti();
                    } else router.push("/build");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert(error.message);
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
