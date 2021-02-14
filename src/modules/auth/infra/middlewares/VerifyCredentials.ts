import { BaseController } from "../../../../shared/infra/BaseController";
import { processTokens } from "../../services/jwt";


export function VerifyCredentials(req, res, next){
	const { token, refreshToken } = req.body;
	
	const errors = [];	
  if(!token)
	  errors.push('Not token provided');
	if(!refreshToken)
		errors.push('Not refresh token provided');
  if(errors.length > 0)
		return BaseController.jsonResponse(res, 401);


  const authResult = processTokens({ token, refreshToken });
	if(authResult.tag === 'left')
		return BaseController.jsonResponse(res,401);

	req.body.accountId = authResult.value.accountId;
	next();
}

