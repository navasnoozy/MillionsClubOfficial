// import { EachBatchPayload } from "kafkajs";
// import { UserCreatedMsg } from "@millionsclub/shared-libs/server";
// import { User } from "../../models/userModel";

// const handle_email_verified = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
//   for (const message of batch.messages) {
//     try {
//       await heartbeat();

//       const { email }: UserCreatedMsg = JSON.parse(message.value?.toString()!);

//       await User.findOneAndUpdate({ email: email }, { emailVerified: true });

//       resolveOffset(message.offset);

//       await commitOffsetsIfNecessary();
//     } catch (error) {
//       console.log("Error processing KAFKA message:", error);
//     }
//   }
// };

// export default handle_email_verified;
