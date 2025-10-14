import { CustomError } from "../errors/custom.error";

export class CommentEntity {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly image: string | null,
    public readonly postId: number,
    public readonly createdAt: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, content, image, postId, createdAt} = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!content) throw CustomError.badRequest("Missing content");
    if (!postId) throw CustomError.badRequest("Missing postId");
    let base64Image: string | null = null;
    if (image) {
      base64Image = `data:image/jpeg;base64,${image.toString("base64")}`;
    }

    return new CommentEntity(id, content, image ?? null, postId, createdAt);
  }
}
