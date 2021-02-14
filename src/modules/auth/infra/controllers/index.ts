import {createAccountUseCase, loginUseCase, verifyCredentialsUseCase} from "../../useCases";
import {CreateAccountController} from "./CreateAccount";
import {LoginController} from "./Login";
import {VerifyCredentialsController} from "./VerifyCredentials";

export const createAccountController = 
				new CreateAccountController(createAccountUseCase);
export const loginController = new LoginController(loginUseCase);
export const verifyCredentialsController = 
				new VerifyCredentialsController(verifyCredentialsUseCase);

