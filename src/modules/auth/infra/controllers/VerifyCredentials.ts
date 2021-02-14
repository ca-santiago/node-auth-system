import {BaseController} from "../../../../shared/infra/BaseController";
import {VerifyCredentialsUseCase} from "../../useCases/verify/UseCase";



export class VerifyCredentialsController extends BaseController {
	constructor(
	  private readonly useCase: VerifyCredentialsUseCase
	) { super(); }

	public async executeImpl(req, res): Promise<any> {
		const { token, refreshToken } = req.body;
		
		const errors = [];
		if (!token)
			errors.push('Should provide token');

		if (errors.length > 0)
			return this.badRequest(res, errors);

		const dto = { token, refreshToken };
		const useCaseResult = await this.useCase.run(dto);

		if(useCaseResult.tag === 'left')
		  return this.unauthorized(res);

	  this.ok(res, useCaseResult.value);	
	}

}
