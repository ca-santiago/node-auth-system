import { DomainEvents} from "../../../shared/domain/events/DomainEvents";
import { NewAccountCreated } from "../domain/Events/NewUserCreated";
import {
	GetMQInstance,
	MQServicePublisher
} from "../../../shared/services/MQ";
import { AcccountCreatedHandler, AcccountDeletedHandler } from "./OnAccountCreated";
import {AccountDeleted} from "../domain/Events/AccountDeleted";

export async function StartAuthSubscriptions(){
	const mq = await GetMQInstance();

	const routingKey = `${process.env.MQ_SERVICE_NAME}.account`;
	const exchange = process.env.MQ_EXCHANGE;

	const mqPublisher = new MQServicePublisher(mq, routingKey, exchange);

	
	// Publishers
	DomainEvents.register(
	  AcccountCreatedHandler(mqPublisher),
    NewAccountCreated.name
	);

	DomainEvents.register(
		AcccountDeletedHandler(mqPublisher),
		AccountDeleted.name
	);
	
	// Consumers
}
