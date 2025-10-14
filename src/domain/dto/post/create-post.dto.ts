export class CreatePostDto {
    constructor(
        public readonly authorId: number,
        public readonly title: string,
        public readonly image: Buffer,
        public readonly description: string,
        public readonly tags: string[],
    ){}

    static create(props: {[key: string]: any}): [string | undefined, CreatePostDto | undefined] {
        const {authorId, title, image, description, tags} = props;
        if (!title || typeof title !== "string") return ["no hay titulo | titulo invalido", undefined]
        if (!image || !Buffer.isBuffer(image)) return ["no hay imagen | imagen invalido", undefined]
        if (!description || typeof description !== "string") return ["no hay descripcion | descripcion invalido", undefined]
        if (!tags || !Array.isArray(tags)) return ["no hay tags | tags invalido", undefined]
        
        

        return [undefined, new CreatePostDto(authorId, title, image, description, tags)]
    }
}