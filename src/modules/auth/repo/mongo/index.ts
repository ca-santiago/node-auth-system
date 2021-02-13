import { Account } from "../../domain/Account";
import { AccountMapper } from "../../mapper";
import { IPersistenceDTO } from "../../mapper/IPersistence";
import { IAccountRepo } from "../IAccountRepo";
import { AccountModel } from "./model";


export class MongoAccountRepo implements IAccountRepo<Account> {

    constructor(private readonly mapper: AccountMapper){}

    async save(entity: Account): Promise<void> {
        const mapped = this.mapper.mapToPersistemce(entity);
        const upsetData = { ...mapped };
        await AccountModel.findByIdAndUpdate(entity.id.value, upsetData,
             { upsert: true}).exec();
        return;
    }

    async exist(idOrErmail: string): Promise<boolean> {
        return await AccountModel.exists({$or: [{email: idOrErmail},{id: idOrErmail}] });
    }

    async findByEmail(email: string): Promise<Account | null> {
       const res = await AccountModel.findOne({email}).exec();
       if(!res)
         return null;
       return this.mapper.mapToDomain(res);
    }

    async find(id: string): Promise<Account> {
        throw new Error("Method not implemented.");
    }
}