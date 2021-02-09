
import mongoose, { Schema, SchemaType, SchemaTypeOpts } from 'mongoose'

export type MongooseTypedSchema<T> = Record<keyof T, SchemaTypeOpts<any> | Schema | SchemaType>;
