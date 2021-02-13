/**
 * @type D domain entity
 */
export interface IAccountRepo<D>{
  save(entity: D): Promise<void>;
  exist(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<D>;
  find(id: string): Promise<D>;
}