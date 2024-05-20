import { IMessage } from "@/domain/entities/threadmessage";
import axios from "axios";

const SendMessageToThread = async (
  threadId: string,
  request: IMessage
): Promise<void> => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_CHAT_ASSIST_API_URL}/thread/messenger-service/${threadId}`,
    request
  );
};

export default SendMessageToThread;
