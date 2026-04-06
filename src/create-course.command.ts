export class CreateCourseCommand {
    constructor(
        public readonly title: string,
        public readonly userId: string,
    ) { }
}
