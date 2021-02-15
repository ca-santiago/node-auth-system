import { left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { LoginDTO } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";
import { BadRequest } from "../Errors";
import { createAuthTokens } from "../../services/jwt";
import { LoginUseCaseResult } from "./Result";


export class LoginUseCase implements IUseCase<LoginDTO, LoginUseCaseResult> {
	
	constructor(
	  private readonly repo: MongoAccountRepo
  ){}


  async run(req: LoginDTO): Promise<LoginUseCaseResult> {
		const { password, email } = req;

		const accountOrNull = await this.repo.findByEmail(email);
		if(!accountOrNull)
			return left(new BadRequest(['Invalid credentials']));
    
	  const validCredentials = accountOrNull.comparePasswords(password);
		if(!validCredentials)
			return left(new BadRequest(['Invalid credentials']));

    const { refreshToken, token } = await createAuthTokens(accountOrNull.id.value);

		return right({
				token, refreshToken,
				accountId: accountOrNull.id.value,
	 	});
  }
}
