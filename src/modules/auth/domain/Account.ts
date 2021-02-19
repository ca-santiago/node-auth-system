
import {Result} from "../../../shared/core/Result";
import {AggregateRoot} from "../../../shared/domain/AggregateRoot";
import {Email} from "./Email";
import {Password} from "./Password";
import {AccountName} from "./Name";
import { EntityId } from "../../../shared/domain/EntityId";
import { NewAccountCreated } from "./Events/NewUserCreated";
import {AccountDeleted} from "./Events/AccountDeleted";

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

	public markAsDelted(): Result<void> {
		this.addDomainEvent(new AccountDeleted(this));
		return Result.ok(null);
	}

	public static create(props: AccountProps, id?: EntityId): Result<Account> {
		const accountInstance = new Account(props, id);

		if(!id) accountInstance.addDomainEvent(new NewAccountCreated(accountInstance));

	  return Result.ok(accountInstance);
	}

}

