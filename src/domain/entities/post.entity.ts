import { envs } from "../../config/envs";
import { allowedMimeTypes } from "../../config/mimeTypes";
import { CustomError } from "../errors/custom.error";

export class PostEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly image: string,
    public readonly description: string,
    public readonly tags: string[],
    public readonly authorId: number,
    public readonly createdAt: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, title, image, description, tags, authorId, createdAt, mimeType } = object;
    
    if (!id) throw CustomError.badRequest("Missing id");
    if (!title) throw CustomError.badRequest("Missing title");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!Array.isArray(tags)) throw CustomError.badRequest("Missing or invalid tags");
    if (!authorId) throw CustomError.badRequest("Missing authorId");
  
    let base64Image: string | null = null;
    if (image) {
      base64Image = `${envs.WEBSERVICE_URL}/feed/post/${id}/image`;
    }
    return new PostEntity(id, title, base64Image!, description, tags, authorId, createdAt);
  }
}
