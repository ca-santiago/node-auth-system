import { Either } from "../../../../shared/core/Either";
import { AuthTokens } from "../../services/jwt";
import { BadRequest } from "../Errors";

export type AccountData = { accountId: string };
export type LoginUseCaseResult = Either<BadRequest, AuthTokens & AccountData>;
