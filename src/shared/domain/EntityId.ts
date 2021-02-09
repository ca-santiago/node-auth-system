import { v4 } from 'uuid'
import { Result } from "../core/Result";
const validate = require('uuid-validate');

export class EntityId {

  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static new(): EntityId {
    let uuid = v4();
    return new EntityId(uuid);
  }

  /**
   * Create an Entity id from value. 
   * Validate the rawId and return a new EntityId instance
   * @param value rawId
   */
  public static from(value: string): Result<EntityId> {
    if (validate(value) === false)
      return Result.fail(['Invalid given entity id']);

    return Result.ok(new EntityId(value));
  }
}