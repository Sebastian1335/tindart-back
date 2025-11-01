export class CreateWhiteboardDto {
  constructor(
    public readonly ownerId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly snapshot?: any,
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreateWhiteboardDto | undefined] {
    const { ownerId, title, description, snapshot } = props;

    if (!ownerId || typeof ownerId !== "number")
      return ["ownerId faltante o inválido", undefined];

    if (!title || typeof title !== "string")
      return ["Título faltante o inválido", undefined];

    if (!description && typeof description !== "string")
      return ["Descripción faltante o inválida", undefined];

    if (snapshot && typeof snapshot !== "object")
      return ["Snapshot inválido (debe ser JSON)", undefined];

    return [undefined, new CreateWhiteboardDto(ownerId, title, description, snapshot)];
  }
}
