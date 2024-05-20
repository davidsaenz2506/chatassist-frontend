import React, { useState } from "react";

import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { IThread } from "@/domain/entities/thread";

import { AttachmentIcon, WarningTwoIcon } from "@chakra-ui/icons";
import DeleteThread from "@/app/api/thread/delete/route";

interface IThreadListProps {
  threads: IThread[];
  isLoading: boolean;
  handleOpenThreadBuilder: () => void;
  currentThread: string;
  setCurrentThread: React.Dispatch<React.SetStateAction<string>>;
  handleReloadThreads: () => Promise<void>;
}

const ThreadList: React.FC<IThreadListProps> = ({
  threads,
  isLoading,
  handleOpenThreadBuilder,
  handleReloadThreads,
  currentThread,
  setCurrentThread,
}) => {
  const [isDeletingThread, setIsDeletingThread] = useState(false);
  const onThreadClick = (threadId: string) => {
    setCurrentThread(threadId);
  };

  const handleDeleteThread = async () => {
    setIsDeletingThread(true);
    await DeleteThread(currentThread);
    await handleReloadThreads();
    setCurrentThread("");
    setIsDeletingThread(false);
  };

  return (
    <Box
      w="350px"
      m={5}
      bgColor="#3F4543"
      borderRadius="20px"
      display="flex"
      flexDirection="column"
      p={5}
    >
      <Box
        display="flex"
        justifyContent="center"
        pb={5}
        borderBottom="2px solid #e2e8f0"
      >
        <Button
          w="100%"
          colorScheme="primary"
          onClick={handleOpenThreadBuilder}
          loadingText="Loading content..."
          isLoading={isLoading}
        >
          Create thread
        </Button>
      </Box>
      <Box display="flex" flexDir="column" flex="1" overflowY="auto" mt={5}>
        {!isLoading && (
          <Box
            display="flex"
            alignItems={"center"}
            mb={4}
            justifyContent="space-between"
          >
            <Text fontSize="30px" fontWeight={700} color="white">
              Threads
            </Text>
            <Button
              colorScheme="red"
              size="sm"
              isDisabled={currentThread ? false : true}
              onClick={handleDeleteThread}
              isLoading={isDeletingThread}
              loadingText="Deleting thread"
            >
              Delete thread
            </Button>
          </Box>
        )}
        {isLoading ? (
          <Box
            height="100%"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner color="white" height={20} w={20} mb={4} />
            <Text color="white" fontWeight="bold">
              Loading your threads, wait a second 🤖
            </Text>
          </Box>
        ) : (
          <>
            {threads.length > 0 ? (
              <>
                {threads.map((thread, index) => {
                  const isThreadSelected = currentThread === thread.threadId;

                  return (
                    <Button
                      key={index}
                      leftIcon={<AttachmentIcon />}
                      mb={3}
                      justifyContent="left"
                      variant="outline"
                      color={isThreadSelected ? "black" : "white"}
                      backgroundColor={
                        isThreadSelected ? "white" : "transparent"
                      }
                      _hover={{
                        color: "black",
                        backgroundColor: "white",
                      }}
                      onClick={() => onThreadClick(thread.threadId)}
                    >
                      {thread.threadName}
                    </Button>
                  );
                })}
              </>
            ) : (
              <Box
                height="100%"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
              >
                <WarningTwoIcon height={20} width={20} color="white" mb={3} />
                <Text color="white" fontWeight="bold">
                  No Threads found
                </Text>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ThreadList;
