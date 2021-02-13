import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export type EmailProps = string;

export class Email extends ValueObject<EmailProps> {

	public static readonly regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	private constructor(props: EmailProps) {
		super(props);
	}

	public static create(props: EmailProps): Result<Email> {
		const errors = [];
		if (this.regex.test(props) === false)
			errors.push('Must provide a valid email');

		// Return an error result
		if (errors.length > 0) return Result.fail(errors);

		const newEmail = new Email(props);
		return Result.ok(newEmail);
	}
}

