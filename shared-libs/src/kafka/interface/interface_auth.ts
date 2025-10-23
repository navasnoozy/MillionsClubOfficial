//shared-libs/src/kafka/interface/interface_auth.ts

import { BaseEvent } from "./interface_kafkaConfig";

export interface UserCreatedEvent extends BaseEvent {
  type: "user.created";
  userId: string;
  data: {
    email: string;
    name: string;
    role: "user" | "admin" | "moderator";
  };
}

export interface UserUpdatedEvent extends BaseEvent {
  type: "user.updated";
  userId: string;
  data: {
    updatedFields: string[];
    previousData?: Record<string, unknown>;
    newData: Record<string, unknown>;
  };
}

export interface UserDeletedEvent extends BaseEvent {
  type: "user.deleted";
  userId: string;
  data: {
    deletedAt: string;
    reason?: string;
  };
}

// Auth events
export interface UserLoginEvent extends BaseEvent {
  type: "user.login";
  userId: string;
  sessionId: string;
  metadata: {
    email: string;
    loginTime: string;
    ipAddress?: string;
    userAgent?: string;
  };
}

export interface UserLogoutEvent extends BaseEvent {
  type: "user.logout";
  userId: string;
  sessionId: string;
  metadata?: {
    logoutReason?: "manual" | "timeout" | "forced";
    logoutTime: string;
  };
}

export interface TokenRefreshEvent extends BaseEvent {
  type: "token.refresh";
  userId: string;
  sessionId: string;
  metadata: {
    oldTokenId?: string;
    newTokenId: string;
    refreshTime: string;
  };
}

export type AuthEvent =
  | UserLoginEvent
  | UserLogoutEvent
  | TokenRefreshEvent
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserDeletedEvent;
