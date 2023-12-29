import React, { useImperativeHandle } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  //   useDisclosure,
} from '@nextui-org/react';

export interface ModalProps {
  children;
  title;
  isOpen;
  onOK;
  onClose;
  myref?;
  size?;
  otherActions?;
}

export default function ActionsModal({
  myref,
  children,
  title,
  isOpen,
  size = 'md',
  onOK,
  onClose,
  otherActions,
}: ModalProps) {
  //  const { isOpen, onOpen, onClose } = useDisclosure();
  //  const [size, setSize] = React.useState<any>("md");

  //   const sizes = [
  //     "xs",
  //     "sm",
  //     "md",
  //     "lg",
  //     "xl",
  //     "2xl",
  //     "3xl",
  //     "4xl",
  //     "5xl",
  //     "full",
  //   ];
  useImperativeHandle(myref, () => ({
    onClose,
    onOK,
  }));

  return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onOK}>
                  OK
                </Button>
                {otherActions}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
