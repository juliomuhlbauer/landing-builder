import { useRoute } from "@/builder/hooks";
import { useOutsideClick } from "@chakra-ui/hooks";
import { Heading, HeadingProps } from "@chakra-ui/layout";
import { FC, useRef } from "react";

const EditableText: FC<HeadingProps> = ({ children, ...rest }) => {
  const editableRef = useRef<HTMLHeadingElement | null>(null);
  useOutsideClick({
    ref: editableRef,
    handler: () => editableRef.current?.blur(),
  });

  const { isBuilder } = useRoute();

  return (
    <Heading
      ref={editableRef}
      rounded="sm"
      p={1}
      contentEditable={isBuilder}
      sx={
        isBuilder
          ? {
              ":hover, :focus": {
                border: "none",
                outline: "none",
                ring: 2,
                ringColor: "primary.600",
              },
            }
          : {}
      }
      suppressContentEditableWarning
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default EditableText;
