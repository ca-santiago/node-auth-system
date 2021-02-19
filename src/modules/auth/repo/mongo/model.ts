import mongoose, { Document } from "mongoose";
import {EntityId} from "../../../../shared/domain/EntityId";
import {DomainEvents} from "../../../../shared/domain/events/DomainEvents";
import { MongooseTypedSchema } from "../../../../shared/types/TypedSchema";
import { IPersistenceDTO } from "../../mapper/IPersistence";

export interface AccountDocument extends IPersistenceDTO, Document {
  _id: string
}

const SchemaDef: MongooseTypedSchema<IPersistenceDTO> = {
  accountname: { type: String },
  email: { type: String },
  password: Object({
    value: String,
    isHashed: String,
  }),
  _id: { type: String }
}


const AccountSchema = new mongoose.Schema(SchemaDef);

AccountSchema.post('findOneAndUpdate', async function (data, next){
	const eId = EntityId.from(this.get('_id')).getValue();
	DomainEvents.dispatchEventsForAggregate(eId);
});

AccountSchema.post('findOneAndDelete', async function (data, next){
	const eId = EntityId.from(data._id).getValue();
	DomainEvents.dispatchEventsForAggregate(eId);
});

export const AccountModel = mongoose.model<AccountDocument>('Account', AccountSchema);
