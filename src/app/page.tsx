"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import SonoraInfo from "../components/SonoraInfo";
import Dialog from "../components/Dialog";
import CreateThread from "./api/thread/create/route";
import GetThreadMessages from "./api/thread/getThreadMessages/route";
import { IMessageContent, IThreadMessage } from "@/domain/entities/message";
import SendMessageToThread from "./api/thread/sendMessageToThread/route";

const Home = () => {
  const [currentThread, setCurrentThread] = useState<string>(
    "thread_hVw1HODLgYL1m42ucKXiSTjq"
  );
  const [currentThreadMessages, setCurrentThreadMessages] = useState<
    IThreadMessage[]
  >([]);
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
    await CreateThread({ threadName: threadTitle, userId: "user_123" });
    setThreadTitle("");
    handleCloseThreadBuilder();
  };

  const handleScrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollTo(0, messagesEndRef.current?.scrollHeight);
    }
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
    const messages = await GetThreadMessages(currentThread);
    setCurrentThreadMessages(messages.reverse());
    handleScrollToBottom();
  }, [currentThread]);

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleString();
  };

  const renderMessageContent = (content: IMessageContent[]) => {
    return content.map((item, index) => (
      <Box key={index} mt={2}>
        {item.text.value.split("\n").map((line, idx) => (
          <Box
            key={idx}
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
            }}
          ></Box>
        ))}
      </Box>
    ));
  };

  const renderMessages = (messages: IThreadMessage[]) => {
    return messages.map((message) => (
      <Box key={message.id} p={4} borderBottom="1px solid #e2e8f0">
        <Box display="flex" justifyContent="space-between" fontWeight="bolder">
          <Box display="flex" alignItems="center">
            <Avatar
              name={message.role === "assistant" ? "Sonora AI" : "Customer"}
              size="sm"
              src={
                message.role === "assistant"
                  ? ""
                  : "https://bit.ly/prosper-baba"
              }
            />
            <Text ml={2}>
              {message.role === "assistant" ? "Sonora 🤖" : "Customer"}
            </Text>
          </Box>
          <span style={{ fontSize: "10px", color: "gray" }}>
            {formatDate(message.created_at)}
          </span>
        </Box>
        {renderMessageContent(message.content)}
      </Box>
    ));
  };

  useEffect(() => {
    getThreadMessages();
  }, [getThreadMessages, messagesEndRef.current]);

  return (
    <>
      <Dialog
        open={openThreadBuilder}
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
        <Box
          w="350px"
          m={5}
          bgColor="#3F4543"
          borderRadius="20px"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="center" p={5}>
            <Button
              w="100%"
              colorScheme="primary"
              onClick={handleOpenThreadBuilder}
            >
              Create thread
            </Button>
          </Box>
        </Box>
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
              <>{renderMessages(currentThreadMessages)}</>
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
