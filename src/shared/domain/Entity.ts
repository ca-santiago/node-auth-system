import { EntityId } from "./EntityId";

export class Entity<T>{

  protected readonly _id: EntityId;
  public readonly props: T;

  constructor(props: T, id?: EntityId) {
    this._id = id ? id : EntityId.new();
    this.props = props;
  }

}