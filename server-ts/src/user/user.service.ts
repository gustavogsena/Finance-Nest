import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/user/user.entity';
import { PopulateHint } from '@mikro-orm/core';
import { Asset } from 'src/assets/assets.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: EntityRepository<User>
    ) { }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({ email })
    }
    async findById(id: number) {
        return await this.userRepository.findOne({ id })
    }

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto)
        await this.userRepository.flush()
        return user
    }

    async uploadPicture(userId: number, picture: Buffer) {
        const picturePath = path.join('public', 'pictures', `${userId}.jpeg`);
        const user = await this.findById(userId);
        try {
            await fs.writeFile(picturePath, picture);
        } catch (error) {
            console.log(error);
            return {
                success: false,
                user,
            };
        }
        const pictureUrl = `/pictures/${userId}.jpeg`;
        user.userPicture = pictureUrl;
        this.userRepository.flush();

        return {
            success: true,
            user,
        };
    }
}
