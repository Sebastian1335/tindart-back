import { CustomError } from "../errors/custom.error"; 

export class UserEntity {
  constructor(
    public id: number,
    public userName: string,
    public email: string,
    public password: string,
    public post?: any[],
    public following?: any[],
    public followers?: any[],
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, userName, email, password, post, following, followers } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!userName) throw CustomError.badRequest("Missing userName");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");

    return new UserEntity(id, userName, email, password, post, following, followers);
  }
}
