import { CustomError } from "../errors/custom.error";

export class PostEntity {
  constructor(
    public id: number,
    public title: string,
    public image: Buffer,
    public description: string,
    public tags: string[],
    public authorId: number,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, title, image, description, tags, authorId } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!title) throw CustomError.badRequest("Missing title");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!Array.isArray(tags)) throw CustomError.badRequest("Missing or invalid tags");
    if (!authorId) throw CustomError.badRequest("Missing authorId");

    return new PostEntity(id, title, image, description, tags, authorId);
  }
}
