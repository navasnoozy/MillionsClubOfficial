// import { ProductCreatedEvent, TOPICS } from "@millionsclub/shared-libs";
// import { productKafkaClient } from "../../config/kafka.client";

// interface ProductData {
//   productId: string;
//   title: string;
// }

// export const publishProductCreated = async (productData: ProductData) => {
//   try {
//     const event: ProductCreatedEvent = {
//       type: "product.created",
//       productId: productData.productId,
//       data: {
//         name: productData.title,
//       },
//       timestamp: Date.now(),
//     };

//     await productKafkaClient.publishMessage(TOPICS.PRODUCT_EVENTS, event);
//   } catch (error) {
//     console.error("Failed to publish product created event", error);
//     // Don't throw error - product creation should succeed even if event fails
//   }
// };
