import { Either } from "../../../../shared/core/Either";
import { AuthTokens } from "../../services/jwt";

export interface AccountData {
  acccountId: string;
}

export type VerifyUseCaseResponse = Either<null, AuthTokens & AccountData>;

