import axios from "axios";

const DeleteThread = async (threadId: string): Promise<void> => {
  await axios.delete(
    `${process.env.NEXT_PUBLIC_CHAT_ASSIST_API_URL}/thread/${threadId}`
  );
};

export default DeleteThread;
