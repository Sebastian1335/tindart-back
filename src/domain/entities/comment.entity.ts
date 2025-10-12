import { CustomError } from "../errors/custom.error";

export class CommentEntity {
  constructor(
    public id: number,
    public content: string,
    public image: Buffer | null,
    public postId: number,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, content, image, postId } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!content) throw CustomError.badRequest("Missing content");
    if (!postId) throw CustomError.badRequest("Missing postId");

    return new CommentEntity(id, content, image ?? null, postId);
  }
}
