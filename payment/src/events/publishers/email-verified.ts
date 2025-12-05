// // notification/src/events/publishers/user_created.ts
// import { EmailVerified, KafkaMessage } from "@millionsclub/shared-libs/server";


// export const publish_email_verified = async (userData: EmailVerified) => {
//   try {
//     const message: KafkaMessage = {
//       key: userData.userId || userData.email,
//       value: {
//         email: userData.email,
//       },
//     };

//     await notificationKafkaClient.publishMessage("email.verified", message);
//   } catch (error) {
//     console.error("Failed to publish product created event", error);
//     // Don't throw error - product creation should succeed even if event fails
//   }
// };
