import { IThreadMessage } from "@/domain/entities/message";

import axios from "axios";

const GetThreadMessages = async (
  threadId: string
): Promise<IThreadMessage[]> => {
  const { data } = await axios.get<IThreadMessage[]>(
    `${process.env.NEXT_PUBLIC_CHAT_ASSIST_API_URL}/thread/messenger-service/get-messages-by-thread/${threadId}`
  );

  return data;
};

export default GetThreadMessages;