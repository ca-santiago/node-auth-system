
import { Result } from "../core/Result";

export namespace UseCasesErrors {

    export class InvalidParamError extends Result<any>{
        constructor(msg: string[]) {
            super(false, msg, null);
        }
    }

    export class Unauthorized extends Result<any>{
        constructor() {
            super(false, ['Unauthorized'], null);
        }
    }

    export class InvalidCredentials extends Result<any>{
        constructor() {
            super(false, ['Invalid credentials'], null);
        }
    }

    export class NotFound extends Result<any>{
        constructor() {
            super(false, ['Not found'], null);
        }
    }

    export class DataBaseConnection extends Result<any>{
        constructor() {
            super(false, ['Database is down'], null)
        }
    }

    export class Conflict extends Result<any>{
        constructor(errors: string[]) {
            super(false, errors, null)
        }
    }
}
