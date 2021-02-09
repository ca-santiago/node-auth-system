import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { EntityId } from "./EntityId";

export abstract class AggregateRoot<T> extends Entity<T>{

  get id(): EntityId {
    return this._id;
  }

  private _domainEvents: IDomainEvent[] = [];

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  /**
   * Agregate a new domain event at the current aggregate lifecicle
   * @param domainEvent 
   */
  protected addDomainEvent(domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
  }


  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

}