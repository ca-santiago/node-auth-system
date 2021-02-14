import { AccountMapper } from "../mapper";
import { MongoAccountRepo } from "../repo/mongo";
import { CreateAccountUseCase } from "./CreateAccont/UseCase";
import { LoginUseCase } from "./Login/UseCase";
import { VerifyCredentialsUseCase } from "./verify/UseCase";
import { DeleteAccountUseCase } from "./DeleteAccount/UseCase";

const accountMapper = new AccountMapper();
const mongoRepo = new MongoAccountRepo(accountMapper);

export const createAccountUseCase = new CreateAccountUseCase(mongoRepo);
export const loginUseCase = new LoginUseCase(mongoRepo);
export const verifyCredentialsUseCase = new VerifyCredentialsUseCase(mongoRepo);
export const deleteAccountUseCase = new DeleteAccountUseCase(mongoRepo);
