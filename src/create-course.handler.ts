import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCourseCommand } from "./create-course.command";


@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler implements ICommandHandler<CreateCourseCommand> {
    async execute(command: CreateCourseCommand) {

        console.log(command.title);
        console.log(command.userId);

        return {
            success: true,
            title: command.title,
            userId: command.userId,
        }
    }
}