export class CreateConversationDto {
    constructor(
        public readonly userOneId: number,
        public readonly userTwoId: number,
    ) {}

    static create(props: { [key: string]: any }): [string | undefined, CreateConversationDto | undefined] {
        const { userOneId, userTwoId } = props;

        if (!userOneId || typeof userOneId !== "number") 
            return ["userOneId inválido o faltante", undefined];

        if (!userTwoId || typeof userTwoId !== "number") 
            return ["userTwoId inválido o faltante", undefined];

        if (userOneId === userTwoId) 
            return ["Una conversación no puede ser contigo mismo", undefined];

        return [undefined, new CreateConversationDto(userOneId, userTwoId)];
    }
}
