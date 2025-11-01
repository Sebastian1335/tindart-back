import { prisma } from "../../data/postgres";
import { CreateWhiteboardDto } from "../../domain/dto/whiteboard/create-whiteboard.dto";
import { UpdateWhiteboardDto } from "../../domain/dto/whiteboard/update-whiteboard.dto";
import { WhiteBoardEntity } from "../../domain/entities/whiteboard.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class WhiteboardService {
    public async getWhiteboards(
        userId: number
    ): Promise<Partial<WhiteBoardEntity>[]> {
        try {
            const res = await prisma.whiteBoard.findMany({
                where: {
                    ownerId: userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            const response = res.map((r) => {
                const { snapshot, ...obj } = WhiteBoardEntity.fromObject(r);
                return obj;
            });
            return response;
        } catch (error) {
            throw CustomError.internalServer(
                "Error al traer los whiteboards del usuario"
            );
        }
    }

    public async getSnapshot(id: number){
        try {
            const res = await prisma.whiteBoard.findUnique({
                where: {
                    id
                },
                select: {
                    snapshot: true
                }
            })
            return res
        } catch (error) {
            throw CustomError.internalServer(
                "Error al traer snapshot"
            );
        }
    }

    public async createWhiteboard(
        dto: CreateWhiteboardDto
    ): Promise<WhiteBoardEntity> {
        try {
            const res = await prisma.whiteBoard.create({
                data: {
                    description: dto.description,
                    title: dto.title,
                    ownerId: dto.ownerId,
                    // snapshot: dto.snapshot ?? null,
                },
            });
            return WhiteBoardEntity.fromObject(res);
        } catch (error) {
            throw CustomError.internalServer("error al crear whiteboard");
        }
    }
    public async updateWhiteboard(
        dto: UpdateWhiteboardDto,
        whiteboardId: number
    ): Promise<WhiteBoardEntity> {
        try {
            const data = Object.fromEntries(
                Object.entries(dto).filter(([_, v]) => v !== undefined)
            );
            const res = await prisma.whiteBoard.update({
                where: {
                    id: whiteboardId,
                },
                data: data,
            });
            return WhiteBoardEntity.fromObject(res);
        } catch (error) {
            throw CustomError.internalServer("error al crear whiteboard");
        }
    }
}
