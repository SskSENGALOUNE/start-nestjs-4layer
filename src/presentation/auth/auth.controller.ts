import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth.response.dto";
import { LoginCommand } from "src/application/auth/commands/login.command";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    @Post('login')
    async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
        const command = new LoginCommand(dto.username, dto.password);
        return this.commandBus.execute(command);
    }
}