import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login({ email, password }: LoginCredentialsDto) {
    const findUser = await this.userService.findByEmail(email);
    console.log(`find ${JSON.stringify(findUser)}`)
    if (findUser?.id === undefined) {
      throw new UnauthorizedException();
    }

    if (await findUser?.comparePassword(password)) {
      const { password, ...user } = findUser
      const payload = { id: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        accessToken,
        user
      };

    } else {
      throw new UnauthorizedException({
        success: false,
        error: ['E-mail ou senha inválidos']
      },);
    }
  }

  async createAccount(createUserDto: CreateUserDto) {
    const maybeUser = await this.userService.findByEmail(createUserDto.email);
    if (maybeUser) {
      throw new BadRequestException({
        success: false,
        errors: ['O email digitado já está cadastrado.']

      });
    }

    await this.userService.create(createUserDto);
    const { user, accessToken } = await this.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return {
      user,
      accessToken,
      success: true,
    };
  }
}

