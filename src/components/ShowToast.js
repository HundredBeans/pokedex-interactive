import { useToast } from "@chakra-ui/react";

export default function showToast(message, type) {
  const toast = useToast();

  return toast({
    description: message,
    status: type,
    duration: 5000,
    isClosable: true,
    position: "top",
  });
}
