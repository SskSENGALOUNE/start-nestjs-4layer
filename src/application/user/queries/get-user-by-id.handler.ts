import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "./get-user-by-id-query";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "src/domain/user/user.repository";
import type { IUserRepository } from "src/domain/user/user.repository";
import { UserEntity } from "src/domain/user/user.entity";
import { UserNotFoundException } from "src/domain/user/user.exceptions";


@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements
    IQueryHandler<GetUserByIdQuery> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(query: GetUserByIdQuery): Promise<UserEntity> {
        const user = await this.userRepository.findById(query.id);
        if (!user) {
            throw new UserNotFoundException(query.id);
        }
        return user;
    }
}