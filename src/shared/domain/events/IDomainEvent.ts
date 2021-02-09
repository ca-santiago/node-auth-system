import { EntityId } from "../EntityId";
import { Entity } from "../Entity";

export interface IDomainEvent {
  entity: Entity<any>;
  dateTimeOccurred: Date;
  getAggregateId(): EntityId;
}

