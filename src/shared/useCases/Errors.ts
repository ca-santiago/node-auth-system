
import { Result } from "../core/Result";

export namespace UseCasesErrors {

    export class InvalidParamError extends Result<any>{
        constructor(msg: string[]) {
            super(msg, undefined);
        }
    }

    export class Unauthorized extends Result<any>{
        constructor() {
            super(['Unauthorized'], undefined);
        }
    }

    export class InvalidCredentials extends Result<any>{
        constructor() {
            super(['Invalid credentials'], undefined);
        }
    }

    export class NotFound extends Result<any>{
        constructor() {
            super(['Not found']);
        }
    }

    export class DataBaseConnection extends Result<any>{
        constructor() {
            super(['Database is down'], undefined)
        }
    }

    export class Conflict extends Result<any>{
        constructor(errors: string[]) {
            super(errors, undefined)
        }
    }
}
