import { Controller, Get, Req, UseGuards } from '@nestjs/common';
 import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
    // GET /users

    // AuthGuard를 통해 token이 없는 경우 unauthorized 에러를 발생
    // @UseGuards(AuthGuard('jwt2'))
    // custom AuthGuard 사용
    @UseGuards(JwtGuard)
    @Get('me') 
    getMe(@Req() req: Request){
        // console.log({
        //     user:req.user // express request로 user를 불러올 수 있음
        // })
        
        // jwt.strategy에서 validate의 user리턴(token)값을 전달
        return req.user;
    }

}
