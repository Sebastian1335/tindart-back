import { CustomError } from "../errors/custom.error";

export class FollowsEntity {
  constructor(
    public id: number,
    public idSeguidor: number,
    public idSeguido: number,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, idSeguidor, idSeguido } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!idSeguidor) throw CustomError.badRequest("Missing idSeguidor");
    if (!idSeguido) throw CustomError.badRequest("Missing idSeguido");

    return new FollowsEntity(id, idSeguidor, idSeguido);
  }
}
