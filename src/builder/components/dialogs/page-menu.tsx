import DeleteModal from "@/builder/components/dialogs/delete-modal";
import { useDashboardStore } from "@/builder/store/use-dashboard";
import { PageProps } from "@/types/pages";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC } from "react";
import { BsThreeDots, BsTrash } from "react-icons/bs";

const PageMenu: FC<{ page: PageProps }> = ({ page }) => {
  const deleteModal = useDisclosure();

  const { deletePage } = useDashboardStore();

  return (
    <Box onClick={(e) => e.preventDefault()}>
      <DeleteModal
        modal={deleteModal}
        title={page.title}
        type="page"
        action={() => deletePage(page.id)}
      />
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Page menu"
          variant="ghost"
          size="sm"
          icon={<Icon as={BsThreeDots} />}
        />
        <MenuList>
          <MenuItem
            icon={<Icon as={BsTrash} />}
            onClick={(e) => {
              if (e.shiftKey) {
                deletePage(page.id);
              } else deleteModal.onOpen();
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default PageMenu;
