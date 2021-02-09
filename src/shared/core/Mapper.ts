
/***
 * Interface to map values betwen Domain, Persistence and EndPoints  
 * @argument E: DomainEntity
 * @argument O: OutputDTO
 * @argument P: PersistenceDTO
 */
export interface Mapper<E, O, P> {
    toDomain: (rawData: P) => E | Promise<E>;
    toPersistence: (domain: E) => P;
    toDTO: (domain: E, extra: object) => O;
}
