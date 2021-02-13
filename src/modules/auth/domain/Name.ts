import {Result} from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface AccountnameProps {
  value: string;
}

export class AccountName extends ValueObject<AccountnameProps> {
  public static regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
  public static maxLenght: number = 36; 

  private constructor(props: AccountnameProps) {
    super(props);
  }

  public static create(props: AccountnameProps): Result<AccountName> {
    const errors = [];
    const finalProps = { ...props };
    
    const len = props.value.length;
    if (len > this.maxLenght || len < 2)
      errors.push("Acccount name should be min 2 and max 36 characters");

    // Return an error result
    if (errors.length > 0) return Result.fail(errors);

    const newPass = new AccountName(finalProps);
    return Result.ok(newPass);
  }
}
