import { Either, left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { Result } from "../../../../shared/core/Result";
import { Account } from "../../domain/Account";
import { Email } from "../../domain/Email";
import { Password } from "../../domain/Password";
import { AccountName } from "../../domain/Name";
import { CreateAccountDTO } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";

type UseCaseResult = Either<string[], void>;

export class CreateAccountUseCase implements IUseCase<CreateAccountDTO, UseCaseResult> {
  public constructor(
    private readonly repo: MongoAccountRepo
  ) { }

  public async run(dto: CreateAccountDTO): Promise<UseCaseResult> {
    const { email, password, accountname } = dto;

    const exist = this.repo.findByEmail(email);
    if(exist)
      return left(['Email already registered']);

    const passOrError = Password.create({ value: password, isHashed: false });
    const accountNameOrError = AccountName.create({ value: accountname });
    const emailOrError = Email.create(email);

    const combineRes = Result.combine([emailOrError, passOrError, accountNameOrError]);

    if (combineRes.isSuccess == false)
      return left(combineRes.errors);

    const newAccount = Account.create({
      AccountName: accountNameOrError.getValue(),
      email: emailOrError.getValue(),
      password: passOrError.getValue(),
    });

    if (newAccount.isSuccess == false)
      return left(newAccount.errors);

    await this.repo.save(newAccount.getValue());

    return right(undefined);
  }
}
