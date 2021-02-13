import {createAccountUseCase} from "../../useCases";
import {CreateAccountController} from "./CreateAccount";

export const createAccountController = new CreateAccountController(createAccountUseCase);
