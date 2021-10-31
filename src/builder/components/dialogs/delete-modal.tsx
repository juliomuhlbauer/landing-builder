import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  chakra,
} from "@chakra-ui/react";

import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { FC } from "react";
import { useToast } from "@chakra-ui/toast";

interface DeleteModalProps {
  modal: UseDisclosureReturn;
  title: string;
  type: string;
  action: Function;
}

const DeleteModal: FC<DeleteModalProps> = ({ modal, title, type, action }) => {
  const toast = useToast();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure to delete {type}{" "}
            <chakra.span fontWeight="bold">{title}</chakra.span>?
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button onClick={() => modal.onClose()}>Cancel</Button>
              <Button
                onClick={() => {
                  action();
                  modal.onClose();
                  toast({
                    title:
                      capitalizeFirstLetter(type) + " " + title + " deleted",
                    status: "error",
                    duration: 3000,
                  });
                }}
                colorScheme="red"
              >
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
