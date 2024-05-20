export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IThread {
  id?: string;
  userId: string;
  threadName: string;
  threadId: string;
  assistantId: string;
  createdBy: IUser;
  updatedBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
