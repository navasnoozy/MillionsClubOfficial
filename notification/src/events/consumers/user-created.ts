import { EachBatchPayload } from "kafkajs";
import createAndSendInitialOtp from "../../services/create-and-send-otp";
import { wsConnectionManager } from "../..";
import { UserCreatedMsg } from "@millionsclub/shared-libs/server";

const handle_user_created = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      await heartbeat();

      const { userId, email, name }: UserCreatedMsg = JSON.parse(message.value?.toString()!);

      await createAndSendInitialOtp(userId, email, name);

      await wsConnectionManager.sendNotification(userId, "Verification mail successfully sent");

      resolveOffset(message.offset);

      await commitOffsetsIfNecessary();
    } catch (error) {
      console.log("Error processing KAFKA message:", error);
      setTimeout( async() => {
        resolveOffset(message.offset);
        await commitOffsetsIfNecessary();
      }, 5000);
    }
  }
};

export default handle_user_created;
