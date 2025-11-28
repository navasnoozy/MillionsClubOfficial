// shared-libs/src/kafka/interface/interface_message.ts

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

export interface ProductCreatedMsg {
  productId?: string;
  title: string;
  basePrice?: string;
  images?: {
    secure_url: string;
    public_id: string;
  }[];
  variantIds?: string[];
  isActive: boolean;
}

export type AllMessages = UserCreatedMsg | ProductCreatedMsg;
