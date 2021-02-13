import bcryptjs from "bcryptjs";
import {Result} from "../../../shared/core/Result";
import {ValueObject} from "../../../shared/domain/ValueObject";

export interface PasswordProps {
  isHashed: boolean;
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  public static readonly regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  private constructor(props: PasswordProps) {
    super(props);
  }

  public static create(props: PasswordProps): Result<Password> {
    const errors = [];
    const finalProps = { ...props };

    if (props.isHashed == false) {
      if (this.regex.test(props.value) === false)
        errors.push("Password should be Minimum eight characters, at least one letter and one number");

      finalProps.value = bcryptjs.hashSync(props.value, bcryptjs.genSaltSync());
      finalProps.isHashed = true;
    } else {}

    // Return an error result
    if (errors.length > 0) return Result.fail(errors);

    const newPass = new Password(finalProps);
    return Result.ok(newPass);
  }
}
