import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface IDialogProps {
  open: boolean;
  isLoading: boolean;
  title: string;
  children: React.ReactNode;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonAction: () => void;
  secondaryButtonAction: () => void;
  onClose: () => void;
}

const Index: React.FC<IDialogProps> = (props) => {
  const {
    open,
    title,
    children,
    isLoading,
    primaryButtonAction,
    primaryButtonText,
    secondaryButtonAction,
    secondaryButtonText,
    onClose,
  } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={secondaryButtonAction}>
              {secondaryButtonText}
            </Button>
            <Button
              colorScheme="primary"
              isLoading={isLoading}
              loadingText={"Building thread"}
              onClick={primaryButtonAction}
              ml={3}
            >
              {primaryButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Index;
