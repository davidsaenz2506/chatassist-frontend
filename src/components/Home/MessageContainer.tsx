import React from "react";

import { Box, Text, Avatar } from "@chakra-ui/react";
import { IMessageContent, IThreadMessage } from "@/domain/entities/message";

interface IMessageContainerProps {
  messageList: IThreadMessage[];
}

const MessageContainer: React.FC<IMessageContainerProps> = ({
  messageList,
}) => {
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
            {formatDate(message.created_at * 1000)}
          </span>
        </Box>
        {renderMessageContent(message.content)}
      </Box>
    ));
  };

  return <>{renderMessages(messageList)}</>;
};

export default MessageContainer;
