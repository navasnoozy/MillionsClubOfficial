//shared-libs/src/kafka/interface/interface_auth.ts

export interface UserCreatedMsg {
  userId: string;
  name: string;
  email: string;
  data?: any;
}

export type AllMessages = UserCreatedMsg;
