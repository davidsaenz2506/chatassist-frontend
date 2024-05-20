export interface IMessageContent {
  type: string;
  text: {
    value: string;
    annotations: any[];
  };
}

export interface IThreadMessage {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: string;
  content: IMessageContent[];
  attachments: any[];
  metadata: Record<string, any>;
}
