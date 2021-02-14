import jwt from 'jsonwebtoken';
import {Either, left, right} from '../../../shared/core/Either';

export const _secret1 = '28B2D447F95417849BB8ECC65733B977E2F10F9DD245861FA0F8867D7B2F9986';
export const _secret2 = 'b9KwpREab2jsCPRFM7TWG31JWplWLZ4YhBu6WuVuQiJppO0lcm8QSSGi9YZURO7';

export interface TokenPayload { userId: string; }
export interface CreateAccessTokenProps { payload: TokenPayload; }
export interface RefreshTokenPayload { userId: string; }
export interface CreateRefreshTokenProps { payload: RefreshTokenPayload; }
export interface AuthTokens { token: string; refreshToken: string; }



export function createAccessToken(props: CreateAccessTokenProps) {
	const { payload } = props;
	const token = jwt.sign(payload, _secret1, { expiresIn: '1m' });
	return token;
}

export function createRefreshToken(props: CreateRefreshTokenProps) {
	const { payload } = props;	
	const token = jwt.sign(payload, _secret2, { expiresIn: '15d'} );
	return token;
}

export function decodeToken(token: string): Either<null, TokenPayload> {
	try {
	  const payload = jwt.verify(token, _secret1);
		if(!payload)
		  return left(null);
		return right(payload as TokenPayload);
	} catch(err) {
		return left(null);
	}
}

export function decodeRefreshToken(token: string): Either<null, RefreshTokenPayload> {
	try {
	  const payload = jwt.verify(token, _secret2);
		if(!payload)
		  return left(null);
		return right(payload as RefreshTokenPayload);
	} catch(err) {
		return left(null);
	}
}

export async function createAuthTokens(userId: string): Promise<AuthTokens> {
	const tokenProps = {payload: {userId}}
  const token = createAccessToken(tokenProps);	

	const refreshProps = {payload: {userId} };
	const refreshToken = createRefreshToken(refreshProps);

	return { token, refreshToken }
}


export function verifyTokens(tokens: AuthTokens, userId): Either<null, AuthTokens> {
	throw new Error('Method not implemented');
	// const { token, refreshToken } = tokens;	

	// let _res = decodeToken(token);	
	// if(_res.tag === 'left'){
		// const refreshRes = decodeRefreshToken(refreshToken);	
		// if(refreshRes.tag === 'left')
		// return left(null);

		// createAccessToken();
	// } else {
	
	//}
}

