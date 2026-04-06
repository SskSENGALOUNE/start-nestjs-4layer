export class CreateSizeCommand {
    constructor(
        public readonly name: string,
        public readonly sortOrder: number,
    ) { }
}