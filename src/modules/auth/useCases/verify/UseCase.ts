import { left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { VerifyCredentialsDTO  } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";
import { processTokens } from "../../services/jwt";
import { Guard} from "../../../../shared/core/Guard";
import { VerifyUseCaseResponse } from "./Result";


export class VerifyCredentialsUseCase implements IUseCase<VerifyCredentialsDTO, VerifyUseCaseResponse> {
	
	constructor(
	  private readonly repo: MongoAccountRepo
  ){}


  async run(req: VerifyCredentialsDTO): Promise<VerifyUseCaseResponse> {
		const { refreshToken, token } = req;

		const refTokenOrDefaul = Guard.optionalInput(refreshToken, '');
		
		const res = processTokens({token, refreshToken: refTokenOrDefaul });
		if(res.tag === 'left')
		  return left(null);


		return right({
		    token: res.value.token,
				refreshToken: res.value.refreshToken,
				acccountId: res.value.accountId
	 	});
  }
}
