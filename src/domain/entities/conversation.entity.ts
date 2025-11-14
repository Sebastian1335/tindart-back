import { CustomError } from "../errors/custom.error";

export class ConversationEntity {
  constructor(
    public readonly id: number,
    public readonly userOneId: number,
    public readonly userTwoId: number,
    public readonly createdAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, userOneId, userTwoId, createdAt } = object;

    if (!id) throw CustomError.badRequest("Missing conversation id");
    if (!userOneId) throw CustomError.badRequest("Missing userOneId");
    if (!userTwoId) throw CustomError.badRequest("Missing userTwoId");

    return new ConversationEntity(
      id,
      userOneId,
      userTwoId,
      createdAt
    );
  }
}
