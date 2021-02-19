import { Entity } from "../../../../shared/domain/Entity";
import { EntityId } from "../../../../shared/domain/EntityId";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Account } from "../Account";


export class AccountDeleted implements IDomainEvent {

	public readonly entity: Entity<any>;
	public readonly dateTimeOccurred: Date;

	constructor(e: Account){
	  this.entity = e;
		this.dateTimeOccurred = new Date();
	}
	
	public getAggregateId(): EntityId {
		return this.entity.props.id;
	}

}
