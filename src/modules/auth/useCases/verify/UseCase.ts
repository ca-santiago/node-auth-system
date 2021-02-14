import { Either, left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { VerifyCredentialsDTO  } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";
import { AuthTokens, processTokens } from "../../services/jwt";
import {Guard} from "../../../../shared/core/Guard";

type _Result = Either<null, AuthTokens>;

export class VerifyCredentialsUseCase implements IUseCase<VerifyCredentialsDTO, _Result> {
	
	constructor(
	  private readonly repo: MongoAccountRepo
  ){}


  async run(req: VerifyCredentialsDTO): Promise<_Result> {
		const { refreshToken, token } = req;

		const refTokenOrDefaul = Guard.optionalInput(refreshToken, '');
		
		const res = processTokens({token, refreshToken: refTokenOrDefaul });
		if(res.tag === 'left')
		  return left(null);


		return right({
		    token: res.value.token,
				refreshToken: res.value.refreshToken
	 	});
  }
}
