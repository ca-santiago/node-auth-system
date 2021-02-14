import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { DeleteAccountUseCase } from '../../useCases/DeleteAccount/UseCase';

export class DeleteAccountController extends BaseController {

	constructor(private readonly useCase: DeleteAccountUseCase) {
		super();
	}

	public async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const { accountId } = req.body;
    
		const dto = { accountId };
		const useCaseResult = await this.useCase.run(dto);

		if (useCaseResult.tag == 'left')
			return this.fail(res, useCaseResult.value);
		else {
			return this.ok(res);
		}
	}
}
