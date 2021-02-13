import { AccountMapper } from "../mapper";
import { MongoAccountRepo } from "../repo/mongo";
import {CreateAccountUseCase} from "./CreateAccont/UseCase";

const accountMapper = new AccountMapper();
const mongoRepo = new MongoAccountRepo(accountMapper);

export const createAccountUseCase = new CreateAccountUseCase(mongoRepo);