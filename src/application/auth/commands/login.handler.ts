import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginCommand } from './login.command';
import type { IUserRepository } from '../../../domain/user/user.repository';
import { USER_REPOSITORY } from '../../../domain/user/user.repository';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(command: LoginCommand) {
        // 1. หา user จาก username
        const user = await this.userRepository.findByUsername(command.username);
        if (!user) throw new UnauthorizedException();

        // 2. เช็ค password
        const isMatch = await bcrypt.compare(command.password, user.password);
        if (!isMatch) throw new UnauthorizedException();

        // 3. สร้าง JWT token                                                                                      
        const payload = {
            sub: user.id,
            username: user.username,
            roles: user.roles,
        };

        return {
            accessToken: this.jwtService.sign(payload),
            username: user.username,
            roles: user.roles,
        };
    }
}