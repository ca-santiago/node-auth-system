import jwt from 'jsonwebtoken';
import {Either, left, right} from '../../../shared/core/Either';

export const _secret1 = '28B2D447F95417849BB8ECC65733B977E2F10F9DD245861FA0F8867D7B2F9986';
export const _secret2 = 'b9KwpREab2jsCPRFM7TWG31JWplWLZ4YhBu6WuVuQiJppO0lcm8QSSGi9YZURO7';

export interface TokenPayload { userId: string; }
export interface CreateAccessTokenProps { payload: TokenPayload; }
export interface RefreshTokenPayload { userId: string; }
export interface CreateRefreshTokenProps { payload: RefreshTokenPayload; }
export interface AuthTokens { token: string; refreshToken: string; }
export type TokenVerificationResult = AuthTokens & {refreshed: boolean};


/**
 * Create a ephimeral access token.
 */
export function createAccessToken(props: CreateAccessTokenProps) {
	const { payload } = props;
	const token = jwt.sign(payload, _secret1, { expiresIn: '1m' });
	return token;
}

/**
 * Create a long live token used for refreshing access
 */
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
/**
 * Create token and refresh token based on the individual methods
 */
export async function createAuthTokens(userId: string): Promise<AuthTokens> {
	const tokenProps = {payload: {userId}}
  const token = createAccessToken(tokenProps);	

	const refreshProps = {payload: {userId} };
	const refreshToken = createRefreshToken(refreshProps);

	return { token, refreshToken }
}

/**
 * Verify the authenticity of each token an return valid ones
 * if both are invalid, just return left.
 */
export function processTokens(tokens: AuthTokens): Either<null, TokenVerificationResult> {
	const { token, refreshToken } = tokens;

  // Verifying acces token authenticity
	// if is valid, just return right otherwise verify refreshToken
	const res = decodeToken(token);
	if(res.tag == 'right') return right({ token, refreshToken, refreshed: false });
		
	// Verifying refresh token authenticity
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

	return right({token: newToken, refreshToken: newRefToken, refreshed: true});
}

