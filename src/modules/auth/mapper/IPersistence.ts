export interface IPersistenceDTO {
  _id: string;
  accountname: string;
  email: string;
  password: {
    value: string;
    isHashed: boolean;
  };
}