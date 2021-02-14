
import {Result} from "../../../shared/core/Result";
import {AggregateRoot} from "../../../shared/domain/AggregateRoot";
import {Email} from "./Email";
import {Password} from "./Password";
import {AccountName} from "./Name";
import { EntityId } from "../../../shared/domain/EntityId";

export interface AccountProps {
	email: Email;
	password: Password;
	AccountName: AccountName;
}

export class Account extends AggregateRoot<AccountProps>{

	private constructor(props: AccountProps, id?: EntityId){
		super(props, id);
	}

	public comparePasswords(toCompare: string): boolean {
	  return this.props.password.compare(toCompare);
	}

	public static create(props: AccountProps, id?: EntityId): Result<Account> {
	  return Result.ok(new Account(props, id));
	}

}

