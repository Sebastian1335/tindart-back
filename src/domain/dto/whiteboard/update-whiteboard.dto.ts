export class UpdateWhiteboardDto {
  constructor(
    public readonly title?: string,
    public readonly description?: string,
    public readonly snapshot?: any,
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, UpdateWhiteboardDto | undefined] {
    const { title, description, snapshot } = props;

    if (
      (title && typeof title !== "string") ||
      (description && typeof description !== "string")
    ) {
      return ["Campos title o description inválidos", undefined];
    }

    if (snapshot && typeof snapshot !== "object")
      return ["Snapshot inválido (debe ser JSON)", undefined];

    // Si no se envía nada, también error
    if (!title && !description && !snapshot)
      return ["No se envió ningún campo para actualizar", undefined];

    return [undefined, new UpdateWhiteboardDto(title, description, snapshot)];
  }
}
