import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserHelperService } from '../service/user-helper';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UserInformation } from '../model/user.interface';
import { LoginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseInfo } from '../../user/model/login-response.interface';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userHelperService: UserHelperService,
  ) {}
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserInformation> {
    const user: UserInformation =
      this.userHelperService.createUserDtoToEntity(createUserDto);
    return this.userService.createUser(user);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<UserInformation>> {
    limit = limit > 50 ? 50 : limit;
    return this.userService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/api/users',
    });
  }

  @Get('/username')
  async findAllByUsername(@Query('username') username: string) {
    return this.userService.findAllByUsername(username);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseInfo> {
    const user: UserInformation =
      this.userHelperService.loginUserDtoToEntity(loginUserDto);
    const jwt: string = await this.userService.login(user);
    return {
      accessToken: jwt,
      tokenType: 'JWT',
      expiresIn: 3600,
    };
  }
}
