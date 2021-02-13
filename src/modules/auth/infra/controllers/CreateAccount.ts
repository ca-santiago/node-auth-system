import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { CreateAccountUseCase } from '../../useCases/CreateAccont/UseCase';

export class CreateAccountController extends BaseController {

	constructor(private readonly useCase: CreateAccountUseCase) {
		super();
	}

	public async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const { email, password, accountname } = req.body;
    
		const errors = [];
		if (!email)
			errors.push('Should provide email');
		if (!password)
			errors.push('Should provide password');
		if (!accountname)
			errors.push('Should provide accountname');

		if (errors.length > 0)
			return this.badRequest(res, errors);

		const dto = { email, password, accountname }
		const useCaseResult = await this.useCase.run(dto);

		if (useCaseResult.tag == 'left')
			return this.fail(res, useCaseResult.value);
		else {
			return this.ok(res);
		}
	}
}
