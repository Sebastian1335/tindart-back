import { CustomError } from "../errors/custom.error";

export class PostEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly image: Buffer,
    public readonly description: string,
    public readonly tags: string[],
    public readonly authorId: number,
    public readonly createdAt: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, title, image, description, tags, authorId, createdAt } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!title) throw CustomError.badRequest("Missing title");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!Array.isArray(tags)) throw CustomError.badRequest("Missing or invalid tags");
    if (!authorId) throw CustomError.badRequest("Missing authorId");

    return new PostEntity(id, title, image, description, tags, authorId, createdAt);
  }
}
