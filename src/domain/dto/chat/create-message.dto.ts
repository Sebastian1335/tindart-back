export class CreateMessageDto {
    constructor(
        public readonly fromId: number,
        public readonly conversationId: number,
        public readonly text: string | null,
        public readonly postId?: number | null,
    ) {}

    static create(props: { [key: string]: any }): [string | undefined, CreateMessageDto | undefined] {
        const { fromId, conversationId, text, postId } = props;

        if (!fromId || typeof fromId !== "number")
            return ["fromId inválido o faltante", undefined];

        if (!conversationId || typeof conversationId !== "number")
            return ["conversationId inválido o faltante", undefined];

        const hasText = text && typeof text === "string";
        const hasPost = postId && typeof postId === "number";

        if (!hasText && !hasPost)
            return ["El mensaje debe tener texto o un postId", undefined];

        return [
            undefined,
            new CreateMessageDto(
                fromId,
                conversationId,
                hasText ? text : null,
                hasPost ? postId : null
            )
        ];
    }
}
