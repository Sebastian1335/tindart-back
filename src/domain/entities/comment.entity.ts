import { CustomError } from "../errors/custom.error";

export class CommentEntity {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly image: Buffer | null,
    public readonly postId: number,
    public readonly createdAt: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, content, image, postId, createdAt} = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!content) throw CustomError.badRequest("Missing content");
    if (!postId) throw CustomError.badRequest("Missing postId");

    return new CommentEntity(id, content, image ?? null, postId, createdAt);
  }
}
