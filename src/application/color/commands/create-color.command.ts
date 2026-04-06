export class CreateColorCommand {
    constructor(
        public readonly name: string,
        public readonly hexCode: string,
    ) { }
}