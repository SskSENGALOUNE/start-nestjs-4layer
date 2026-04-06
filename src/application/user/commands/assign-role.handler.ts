import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AssignRoleCommand } from "./assign-role.command";
import { UserNotFoundException } from "src/domain/user/user.exceptions";
import { Inject } from "@nestjs/common";
import type { IUserRepository } from '../../../domain/user/user.repository';
import { USER_REPOSITORY } from '../../../domain/user/user.repository';

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler implements
    ICommandHandler<AssignRoleCommand> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: AssignRoleCommand): Promise<void> {
        const user = await
            this.userRepository.findById(command.userId);
        if (!user) {
            throw new UserNotFoundException(command.userId);
        }
        await this.userRepository.assignRole(command.userId,
            command.roleId);
    }
}