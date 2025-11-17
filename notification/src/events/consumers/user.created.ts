import { EachBatchPayload } from "kafkajs";
import createAndSendInitialOtp from "../../services/createAndSendOtp";
import { wsConnectionManager } from "../..";
import { UserCreatedMsg } from "@millionsclub/shared-libs/server";

const handle_user_created = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      console.log('first check');
      
      await heartbeat();

      const { userId, email, name }: UserCreatedMsg = JSON.parse(message.value?.toString()!);

      await createAndSendInitialOtp(userId, email, name);
         console.log(' check after email sent ');

      await wsConnectionManager.sendNotification(userId, "Verification mail successfully sent");
      console.log(' check after ws sent ');

       resolveOffset(message.offset);
       console.log(' check after resolve sent ');

      await commitOffsetsIfNecessary();
      console.log(' check after resolve all sent ');
    } catch (error) {
      console.log("Error processing KAFKA message:", error);
      setTimeout(async () => {
        resolveOffset(message.offset);
        await commitOffsetsIfNecessary();
      }, 5000);
    }
  }
};

export default handle_user_created;
