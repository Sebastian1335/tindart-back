import { CustomError } from "../errors/custom.error"; 

export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly userName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly post?: any[],
    public readonly following?: any[],
    public readonly followers?: any[],
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, userName, email, password, post, following, followers, createdAt } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!userName) throw CustomError.badRequest("Missing userName");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");

    return new UserEntity(id, userName, email, password, createdAt, post, following, followers);
  }
}
