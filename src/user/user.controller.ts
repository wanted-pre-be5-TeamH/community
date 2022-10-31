import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';//'src/auth/guard';
import { PostingDto } from './dto/posting.dto';
import { UserService } from './user.service';

// AuthGuard를 통해 token이 없는 경우 unauthorized 에러를 발생
// @UseGuards(AuthGuard('jwt2'))
// custom AuthGuard 사용
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    // GET /users
    constructor(private userService: UserService) {

    }

    // custom Decorator를 통해 user get
    @Get('me')
    getMe(
        @GetUser() user: User,
        // @GetUser('email') email: string // decorator를 통해 user객체 접근하여 원하는 element만 가져올 수 있음
    ) {
        // console.log({
        //     user:req.user // express request로 user를 불러올 수 있음
        // })
        // jwt.strategy에서 validate의 user리턴(token)값을 전달
        return user;
    }

    @Post('createPosting')
    createPosting(
        @GetUser('id') userId: number,
        @Body() dto: PostingDto
    ) {
        return this.userService.createPosting(userId, dto);
    }

    @Get(':id')
    getPostingById(
        @GetUser('id') userId: number,
        @Param('id') id: number
    ) {
        return this.userService.getPostingById(userId, id);
    }
}
