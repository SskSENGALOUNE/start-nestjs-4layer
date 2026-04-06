import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCourseCommand } from "./create-course.command";
import { JwtAuthGuard } from "./presentation/auth/guards/jwt.guard";
import { RolesGuard } from "./presentation/auth/guards/roles.guard";
import { Roles } from "./presentation/auth/decorators/roles.decorator";

export class CreateCourseDto {
    name: string;
    userId: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
@Controller('course')
export class CourseController {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    @Post()
    async createCourse(@Body() dto: CreateCourseDto) {
        console.log('-----------Controller รับ request-----------')

        return this.commandBus.execute(
            new CreateCourseCommand(dto.name, dto.userId)
        )
    }

}