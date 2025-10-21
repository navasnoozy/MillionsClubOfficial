//shared-libs/src/kafka/product.types.ts
import { BaseEvent } from "./kafkaConfig.types";

export interface ProductCreatedEvent extends BaseEvent {
  type: "product.created";
  productId: string;
  data: {
    name: string;
  };
}

export interface ProductUpdatedEvent extends BaseEvent {
  type: "product.updated";
  productId: string;
  data: {
    updatedFields: string[];
    previousData?: Record<string, unknown>;
    newData: Record<string, unknown>;
    userId: string; // who updated it
  };
}

export interface ProductDeletedEvent extends BaseEvent {
  type: "product.deleted";
  productId: string;
  data: {
    deletedAt: string;
    userId: string; // who deleted it
    reason?: string;
  };
}

export type ProductEvent =
  | ProductCreatedEvent
  | ProductUpdatedEvent
  | ProductDeletedEvent;
