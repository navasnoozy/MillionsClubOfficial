//shared-libs/src/kafka/interface/interface_auth.ts

export interface UserCreatedMsg {
  userId: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  data?: any;
}

export interface EmailVerified {
  userId?: string;
  name?: string;
  email: string;
  data?: any;
}

export type AllMessages = UserCreatedMsg | EmailVerified;
