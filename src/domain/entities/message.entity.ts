import { envs } from "../../config/envs";
import { CustomError } from "../errors/custom.error";

export class MessageEntity {
  constructor(
    public readonly id: number,
    public readonly text: string | null,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly fromId: number,
    public readonly conversationId: number,
    public readonly postId: number | null,
    public readonly postPreviewUrl: string | null,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { 
      id, text, status, createdAt,
      fromId, conversationId,
      postId, post 
    } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!fromId) throw CustomError.badRequest("Missing fromId");
    if (!conversationId) throw CustomError.badRequest("Missing conversationId");
    if (!status) throw CustomError.badRequest("Missing status");

    let postPreviewUrl: string | null = null;

    if (postId && post) {
      postPreviewUrl = `${envs.WEBSERVICE_URL}/feed/post/${postId}/image`;
    }

    return new MessageEntity(
      id,
      text ?? null,
      status,
      createdAt,
      fromId,
      conversationId,
      postId ?? null,
      postPreviewUrl
    );
  }
}
