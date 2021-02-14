import { CreateAccountController } from "./CreateAccount";
import { LoginController } from "./Login";
import { VerifyCredentialsController } from "./VerifyCredentials";
import {DeleteAccountController} from "./DeleteAccountController";
import {
  createAccountUseCase,
	loginUseCase,
	verifyCredentialsUseCase,
	deleteAccountUseCase
} from "../../useCases";


export const createAccountController = 
				new CreateAccountController(createAccountUseCase);
export const loginController = new LoginController(loginUseCase);
export const verifyCredentialsController = 
				new VerifyCredentialsController(verifyCredentialsUseCase);
export const deleteAccountController =
				new DeleteAccountController(deleteAccountUseCase);
