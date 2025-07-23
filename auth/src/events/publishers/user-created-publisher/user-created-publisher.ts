import { UserCreatedEvent } from "@millionsclub/shared-libs";
import { KafkaPublisher } from "../base/kafka-publisher";


export class UserCreatePublisher extends KafkaPublisher <UserCreatedEvent> {
     topic = 'user'
}