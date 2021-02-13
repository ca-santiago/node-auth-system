import mongoose, { Document } from "mongoose";
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

const accountSchema = new mongoose.Schema(SchemaDef);
export const AccountModel = mongoose.model<AccountDocument>('Account', accountSchema);