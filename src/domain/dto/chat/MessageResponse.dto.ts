import { envs } from "../../../config/envs";
import { MessageEntity } from "../../entities/message.entity";

export class MessageResponseDto {
  constructor(
    public readonly id: number,
    public readonly text: string | null,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly fromId: number,
    public readonly conversationId: number,
    public readonly postPreviewUrl: string | null,
  ) {}

  static fromEntity(entity: MessageEntity) {
    return new MessageResponseDto(
      entity.id,
      entity.text,
      entity.status,
      entity.createdAt,
      entity.fromId,
      entity.conversationId,
      entity.postId
        ? `${envs.WEBSERVICE_URL}/feed/post/${entity.postId}/image`
        : null
    );
  }
}
