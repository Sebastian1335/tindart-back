import { allowedMimeTypes } from "../../../config/mimeTypes";

export class CreateCommentDto {
    constructor(
        public readonly authorId: number,
        public readonly postId: number,
        public readonly content: string,
        public readonly image?: Buffer,
        public readonly imageMimeType?: string,
    ){}

    static create(props: {[key: string]: any}): [string | undefined, CreateCommentDto | undefined] {
        const {authorId, postId,  content, image, imageMimeType} = props;
        if (!content || typeof content !== "string") return ["no hay titulo | titulo invalido", undefined]
        if (image && !Buffer.isBuffer(image)) return ["imagen invalido", undefined]
        if (imageMimeType && !allowedMimeTypes.includes(imageMimeType)) return [`mimeType no permitido (${imageMimeType})`, undefined];
        if (!authorId) return ["no hay id de autor del comentario", undefined]
        if (!postId) return ["no hay id de la publicacion a comentar", undefined]

        return [undefined, new CreateCommentDto(authorId, postId, content, image, imageMimeType)]
    }
}