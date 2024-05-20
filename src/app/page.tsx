import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Box h="100vh" display="flex" bgColor="#F8F6F1">
      <Box
        w="350px"
        m={5}
        bgColor="#3F4543"
        borderRadius="20px"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" p={5}>
          <Button w="100%" colorScheme="primary">
            Create thread
          </Button>
        </Box>
      </Box>
      <Box
        m={5}
        flex="1"
        display="flex"
        flexDir="column"
        borderRadius="20px"
        bgColor="#F4EEE7"
      >
        <Box flex="1"></Box>
        <Box p={5}>
          <InputGroup size="md">
            <Input type={"text"} placeholder="Enter your query, action and Sonora will help you" />
            <InputRightElement mr={4}>
              <Button colorScheme="primary" size="md">
                {"Send"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
}
