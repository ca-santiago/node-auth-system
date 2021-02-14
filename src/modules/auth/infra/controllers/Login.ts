import express from "express";
import { BaseController } from "../../../../shared/infra/BaseController";
import { LoginDTO } from "../../useCases/Login/DTO";
import { LoginUseCase } from "../../useCases/Login/UseCase";
import { BadRequest } from '../../useCases/Errors';


export class LoginController extends BaseController {

  constructor(
	  private readonly useCase: LoginUseCase,
	){ super(); }

	async executeImpl(req: express.Request, res: express.Response): Promise<any> {
		const { email, password } = req.body;

		const errors = [];
		if (!email)
			errors.push('Should provide email');
		if (!password)
			errors.push('Should provide password');

		if (errors.length > 0)
			return this.badRequest(res, errors);


		const dto: LoginDTO = {
			email: req.body.email,
			password: req.body.password,
		}	

	  const useCaseResult = await this.useCase.run(dto);
		if(useCaseResult.tag == 'left'){
			switch(useCaseResult.value.constructor){
			  case BadRequest:
					return this.unauthorized(res);
				default:
					return this.fail(res);
			}
		}
		else 
			return this.ok(res, useCaseResult.value);
	}
}
