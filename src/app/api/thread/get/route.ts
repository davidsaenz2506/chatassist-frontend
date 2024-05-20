import { IThread } from "@/domain/entities/thread";

import axios from "axios";

const GetAllThreads = async (): Promise<IThread[]> => {
  const { data } = await axios.get<IThread[]>(
    `${process.env.NEXT_PUBLIC_CHAT_ASSIST_API_URL}/thread`
  );

  return data;
};

export default GetAllThreads;