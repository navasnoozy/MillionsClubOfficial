// shared-libs/src/kafka/interface/interface_topic.ts

import {
  UserCreatedMsg,
  UserUpdatedMsg,
  UserDeletedMsg,
  EmailVerified,
  CategoryCreatedMsg,
  CategoryUpdatedMsg,
  CategoryDeletedMsg,
  SubcategoryCreatedMsg,
  SubcategoryUpdatedMsg,
  SubcategoryDeletedMsg,
  ProductCreatedMsg,
  ProductUpdatedMsg,
  ProductDeletedMsg,
  VariantCreatedMsg,
  VariantUpdatedMsg,
  VariantDeletedMsg,
} from "./interface_message";

// ================================
// 1. Define all topics
// ================================
export const TOPIC_EVENTS = {
  "user.created": "user.created",
  "user.updated": "user.updated",
  "user.deleted": "user.deleted",
  "email.verified": "email.verified",

  "category.created": "category.created",
  "category.updated": "category.updated",
  "category.deleted": "category.deleted",

  "subcategory.created": "subcategory.created",
  "subcategory.updated": "subcategory.updated",
  "subcategory.deleted": "subcategory.deleted",

  "product.created": "product.created",
  "product.updated": "product.updated",
  "product.deleted": "product.deleted",

  "variant.created": "variant.created",
  "variant.updated": "variant.updated",
  "variant.deleted": "variant.deleted",
} as const;

export type TopicNames = keyof typeof TOPIC_EVENTS;

// ================================
// 2. Map each topic → message type
// ================================
export interface TopicPayloadMap {
  "user.created": UserCreatedMsg;
  "user.updated": UserUpdatedMsg;
  "user.deleted": UserDeletedMsg;
  "email.verified": EmailVerified;

  "category.created": CategoryCreatedMsg;
  "category.updated": CategoryUpdatedMsg;
  "category.deleted": CategoryDeletedMsg;

  "subcategory.created": SubcategoryCreatedMsg;
  "subcategory.updated": SubcategoryUpdatedMsg;
  "subcategory.deleted": SubcategoryDeletedMsg;

  "product.created": ProductCreatedMsg;
  "product.updated": ProductUpdatedMsg;
  "product.deleted": ProductDeletedMsg;

  "variant.created": VariantCreatedMsg;
  "variant.updated": VariantUpdatedMsg;
  "variant.deleted": VariantDeletedMsg;
}

// ================================
// 3. Generic Kafka message type
// ================================
export interface KafkaMessage<T extends TopicNames> {
  key: string;
  value: TopicPayloadMap[T];
}
