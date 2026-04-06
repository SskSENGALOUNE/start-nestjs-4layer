
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LoginHandler } from '../../application/auth/commands/login.handler';
import { UserRepositoryImpl } from '../../infrastructure/prisma/repositories/user.repository.impl';
import { USER_REPOSITORY } from '../../domain/user/user.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
    imports: [CqrsModule, PassportModule, PrismaModule],
    controllers: [AuthController],
    providers: [
        LoginHandler,
        JwtStrategy,
        {
            provide: USER_REPOSITORY,
            useClass: UserRepositoryImpl,
        },
    ],
})
export class AuthModule { }