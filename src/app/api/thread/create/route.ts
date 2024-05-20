import { IThread } from "@/domain/entities/thread";
import axios from "axios";

const CreateThread = async (request: Partial<IThread>): Promise<IThread> => {
  const { data } = await axios.post<IThread>(
    `${process.env.NEXT_PUBLIC_CHAT_ASSIST_API_URL}/thread`,
    request
  );
  return data;
};

export default CreateThread;
