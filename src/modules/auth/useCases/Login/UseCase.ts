import { Either, left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { LoginDTO } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";
import { BadRequest } from "../Errors";
import { createAuthTokens } from "../../services/jwt";

type tokenData = {token: string, refreshToken: string}
type _Result = Either< 
      BadRequest, 
		  tokenData
		>;

export class LoginUseCase implements IUseCase<LoginDTO, _Result> {
	
	constructor(
	  private readonly repo: MongoAccountRepo
  ){}


  async run(req: LoginDTO): Promise<_Result> {
		const { password, email } = req;

		const accountOrNull = await this.repo.findByEmail(req.email);
		if(!accountOrNull)
			return left(new BadRequest(['Invalid credentials']));
    
	  const validCredentials = accountOrNull.comparePasswords(password);
		if(!validCredentials)
			return left(new BadRequest(['Invalid credentials']));

    const { refreshToken, token } = await createAuthTokens(accountOrNull.id.value);

		return right({ token, refreshToken });
  }
}
