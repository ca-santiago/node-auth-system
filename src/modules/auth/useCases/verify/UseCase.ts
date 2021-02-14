import { Either, left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { VerifyCredentialsDTO  } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";
import { AuthTokens, createAccessToken, CreateAccessTokenProps, createAuthTokens, createRefreshToken, decodeRefreshToken, decodeToken } from "../../services/jwt";

type _Result = Either<null, AuthTokens>;

export class VerifyCredentialsUseCase implements IUseCase<VerifyCredentialsDTO, _Result> {
	
	constructor(
	  private readonly repo: MongoAccountRepo
  ){}


  async run(req: VerifyCredentialsDTO): Promise<_Result> {
		const { refreshToken, token } = req;
		
		// Verifying acces token authenticity
		// if is valid, just return right otherwise verify refreshToken
		const res = decodeToken(token);
		if(res.tag == 'right') return right({token, refreshToken });
		
		// Verifying acces token authenticity
		// if is invalid return left otherwise continue to generate new tokens
		const refresResult = decodeRefreshToken(refreshToken);
		if(refresResult.tag === 'left') return left(null);	
		

		// Creating new tokens
		const newToken = createAccessToken({
			payload: { userId: refresResult.value.userId }
		});	
		const newRefToken = createRefreshToken({
			payload: { userId: refresResult.value.userId }	
		});


		return right({ 
				token: newToken,
				refreshToken: newRefToken
	    });
  }
}
