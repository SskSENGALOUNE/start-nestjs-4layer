import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUsersQuery } from "./get-all-users.query";
import { USER_REPOSITORY, type IUserRepository } from "src/domain/user/user.repository";
import { UserEntity } from "src/domain/user/user.entity";
import { Inject } from "@nestjs/common";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(): Promise<{ data: UserEntity[], total: number }> {
        const users = await this.userRepository.findAll();
        return { data: users, total: users.length };
    }
}