import { EntityId } from "../../../shared/domain/EntityId";
import { Account, AccountProps } from "../domain/Account";
import { Email } from "../domain/Email";
import { AccountName } from "../domain/Name";
import { Password } from "../domain/Password";
import { IPersistenceDTO } from "./IPersistence";
import { PublicAccountDTO } from "./PublicDTO";

export class AccountMapper {
  public async mapToDomain(rawData: IPersistenceDTO): Promise<Account> {
    const { email, password: { value, isHashed }, accountname, _id } = rawData;
    try {
      const emailIns = Email.create(email);
      const passIns = Password.create({ value, isHashed });
      const nameIns = AccountName.create({ value: accountname });
      const accId = EntityId.from(_id);

      const accountProps: AccountProps = {
        AccountName: nameIns.getValue(),
        password: passIns.getValue(),
        email: emailIns.getValue(),
      }
      const instance: Account = Account.create(accountProps, accId.getValue()).getValue();
      return instance;
    }
    catch (err) {
      throw new Error('[Mapper] Error while mapping from persistence to domain');
    }
  }

  public mapToPersistemce(e: Account): IPersistenceDTO {
    const { email, password, AccountName } = e.props;
    const output: IPersistenceDTO = {
      _id: e.id.value,
      email: email.raw,
      password: password.raw,
      accountname: AccountName.raw.value,
    }
    return output;
  }

  public mapToDTO(e: Account): PublicAccountDTO {
    const { email, AccountName } = e.props;
    const dto: PublicAccountDTO = {
      accountname: AccountName.raw.value,
      email: email.raw,
      id: e.id.value,
    }
    return dto;
  }
}
