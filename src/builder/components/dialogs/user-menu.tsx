import { signOut, useUser } from "@/utils/auth";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Box,
  Avatar,
  HStack,
  Icon,
  Text,
  IconButton,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export const UserMenu = () => {
  const { user } = useUser();
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Menu>
        <MenuButton
          as={Avatar}
          name={user?.user_metadata?.full_name}
          src={user?.user_metadata.avatar_url}
          cursor="pointer"
          ring={2}
          ringColor="primary.200"
        />

        <MenuList>
          <MenuGroup title="Profile" fontSize="lg" fontWeight="bold">
            <MenuItem>
              <HStack spacing={4}>
                <Avatar
                  ring={2}
                  ringColor="primary.200"
                  name={user?.user_metadata?.full_name}
                  size="md"
                  src={user?.user_metadata?.avatar_url}
                  objectFit="contain"
                />
                <Text fontSize="lg" fontWeight="semibold">
                  {user?.user_metadata?.full_name}
                </Text>
              </HStack>
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuItem closeOnSelect={false}>
            <HStack justify="space-between" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                Theme
              </Text>
              <Button
                colorScheme="primary"
                aria-label="Toggle color mode"
                onClick={toggleColorMode}
                leftIcon={
                  <Icon
                    as={colorMode === "light" ? BsFillSunFill : BsFillMoonFill}
                  />
                }
              >
                {colorMode === "light" ? "Light" : "Dark"}
              </Button>
            </HStack>
          </MenuItem>

          <MenuDivider />

          <MenuItem
            icon={<Icon as={FiLogOut} boxSize={5} />}
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            SignOut
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
