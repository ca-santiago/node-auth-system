
/***
 * Interface to map values betwen Domain, Persistence and EndPoints  
 * @argument E: DomainEntity
 * @argument O: OutputDTO
 * @argument P: PersistenceDTO
 */
export interface IMapper<E, O, P> {
    toDomain: (rawData: P) => Promise<E> | E;
    toPersistence: (domain: E) => P;
    toDTO: (domain: E) => O;
}