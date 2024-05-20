"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";

import { IThreadMessage } from "@/domain/entities/message";
import { IThread } from "@/domain/entities/thread";

import SonoraInfo from "../components/SonoraInfo";
import Dialog from "../components/Dialog";
import ThreadList from "../components/Home/ThreadList";
import MessageContainer from "@/components/Home/MessageContainer";

import CreateThread from "./api/thread/create/route";
import GetThreadMessages from "./api/thread/getThreadMessages/route";
import SendMessageToThread from "./api/thread/sendMessageToThread/route";
import GetAllThreads from "./api/thread/get/route";

const Home = () => {
  const [currentUserThreads, setCurrentUserThreads] = useState<IThread[]>([]);
  const [currentThread, setCurrentThread] = useState<string>("");
  const [currentThreadMessages, setCurrentThreadMessages] = useState<
    IThreadMessage[]
  >([]);
  const [loadingThreads, setLoadingThreads] = useState<boolean>(false);
  const [isGettingThreadMessages, setIsGettingThreadMessages] =
    useState<boolean>(false);
  const [isCreatingThread, setIsCreatingThread] = useState<boolean>(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [openThreadBuilder, setOpenThreadBuilder] = useState(false);
  const [customerInput, setCustomerInput] = useState("");
  const [threadTitle, setThreadTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleOpenThreadBuilder = () => {
    setOpenThreadBuilder(true);
  };

  const handleCloseThreadBuilder = () => {
    setOpenThreadBuilder(false);
  };

  const handleCreateThread = async () => {
    setIsCreatingThread(true);
    await CreateThread({ threadName: threadTitle, userId: "user_123" });
    getAllThreads();

    setThreadTitle("");
    handleCloseThreadBuilder();
    setIsCreatingThread(false);
  };

  const sendMessageToThread = async () => {
    setIsSendingMessage(true);
    await SendMessageToThread(currentThread, {
      message: customerInput,
    });

    await getThreadMessages();

    setCustomerInput("");
    setIsSendingMessage(false);
  };

  const handleThreadTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThreadTitle(event.target.value);
  };

  const getThreadMessages = useCallback(async () => {
    setIsGettingThreadMessages(true);
    const messages = await GetThreadMessages(currentThread);
    setCurrentThreadMessages(messages.reverse());
    setIsGettingThreadMessages(false);
    handleScrollToBottom();
  }, [currentThread]);

  const getAllThreads = async () => {
    setLoadingThreads(true);
    const threads = await GetAllThreads();

    setCurrentUserThreads(threads);
    setLoadingThreads(false);
  };

  const handleScrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollTo(0, messagesEndRef.current?.scrollHeight);
    }
  };

  useEffect(() => {
    if (currentThread.length) {
      getThreadMessages();
    } else {
      setCurrentThreadMessages([]);
    }
  }, [currentThread, getThreadMessages]);

  useEffect(() => {
    getAllThreads();
  }, []);

  return (
    <>
      <Dialog
        open={openThreadBuilder}
        isLoading={isCreatingThread}
        title={"Create new Thread"}
        primaryButtonText={"Create"}
        secondaryButtonText={"Cancel"}
        primaryButtonAction={handleCreateThread}
        secondaryButtonAction={handleCloseThreadBuilder}
        onClose={handleCloseThreadBuilder}
      >
        <Input
          value={threadTitle}
          onChange={handleThreadTitleChange}
          placeholder="Enter thread title"
        />
      </Dialog>
      <Box h="100vh" display="flex" bgColor="#F8F6F1">
        <ThreadList
          threads={currentUserThreads}
          isLoading={loadingThreads}
          handleOpenThreadBuilder={handleOpenThreadBuilder}
          currentThread={currentThread}
          setCurrentThread={setCurrentThread}
          handleReloadThreads={getAllThreads}
        />
        <Box
          m={5}
          flex="1"
          display="flex"
          flexDir="column"
          borderRadius="20px 0 20px 20px"
          bgColor="white"
        >
          <Box flex="1" overflowY="auto" ref={messagesEndRef}>
            {currentThreadMessages.length > 0 ? (
              <MessageContainer messageList={currentThreadMessages} />
            ) : (
              <SonoraInfo />
            )}
          </Box>
          <Box p={5}>
            <InputGroup size="md">
              <Input
                type="text"
                pr="5.9rem"
                placeholder="Enter your query / action and Sonora will help you"
                value={customerInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomerInput(e.target.value)
                }
              />
              <InputRightElement width="6rem">
                <Button
                  colorScheme="primary"
                  size="md"
                  borderRadius="15px"
                  onClick={sendMessageToThread}
                  isDisabled={!customerInput.length || !currentThread.length}
                >
                  {isSendingMessage ? <Spinner /> : "Send"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
