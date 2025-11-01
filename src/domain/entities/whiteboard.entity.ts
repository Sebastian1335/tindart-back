import { CustomError } from "../errors/custom.error";

export class WhiteBoardEntity {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly ownerId: number,
        public readonly snapshot?: object,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}
    static fromObject(object: { [key: string]: any }) {
        const {
            id,
            title,
            description,
            snapshot,
            ownerId,
            createdAt,
            updatedAt,
        } = object;

        if (!id) throw CustomError.badRequest("Missing id");
        if (!title) throw CustomError.badRequest("Missing title");
        if (!description) throw CustomError.badRequest("Missing description");
        if (!ownerId) throw CustomError.badRequest("Missing ownerId");

        return new WhiteBoardEntity(
            id,
            title,
            description,
            ownerId,
            snapshot,
            createdAt,
            updatedAt
        );
    }
}
