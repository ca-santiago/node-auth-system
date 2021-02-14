import { Either, left, right } from "../../../../shared/core/Either";
import { IUseCase } from "../../../../shared/core/IUseCase";
import { Result } from "../../../../shared/core/Result";
import { DeleteAccountDTO } from "./DTO";
import { MongoAccountRepo } from "../../repo/mongo";

type UseCaseResult = Either<string[], void>;

export class CreateAccountUseCase implements IUseCase<DeleteAccountDTO, UseCaseResult> {
  public constructor(
    private readonly repo: MongoAccountRepo
  ) { }

  public async run(dto: DeleteAccountDTO): Promise<UseCaseResult> {
		throw new Error("Not implemented yet");
  }
}

