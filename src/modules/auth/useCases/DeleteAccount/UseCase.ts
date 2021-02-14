import { Either, left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { DeleteAccountDTO } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";

type UseCaseResult = Either<string[], void>;

export class DeleteAccountUseCase implements IUseCase<DeleteAccountDTO, UseCaseResult> {
  public constructor(
    private readonly repo: MongoAccountRepo
  ) { }

  public async run(dto: DeleteAccountDTO): Promise<UseCaseResult> {
		const { accountId } = dto;
		console.log(accountId);
		await this.repo.delete(accountId);
		return right(null);
  }
}

