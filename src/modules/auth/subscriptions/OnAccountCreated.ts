import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent";
import { MQServicePublisher } from "../../../shared/services/MQ";
import { Account } from "../domain/Account";

export function AcccountCreatedHandler(publisher: MQServicePublisher) {
	return (rawData: IDomainEvent) => {
    const etty = rawData.entity as Account;
	  const payload = {
		  accoutnId: etty.id.value,
		  email: etty.props.email.raw,
		  dateTimeOccurred: rawData.dateTimeOccurred,
		  extra: etty.props.AccountName,
	  }
    publisher.publish(payload, 'created');
	}
}

