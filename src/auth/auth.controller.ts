import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    // instanciate
    constructor(private authService: AuthService) {
        // this.authService.test();
    }

    // @Post('signup')
    // 추후 fastify나 다른 프레임워크를 쓸 가능성을 두고 확장성을 위해 파라미터를 @Req로 받지 않고 아래와 같이 Body DTO로 받음
    // signup(@Req() req: Request) {
    //     console.log(req.headers)
    //     console.log(req.body)
    //     return this.authService.signup();
    // }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({
            dto,
        })
        //전달되는 dto의 validation 체크를 간편하게 할 수 있는 pipe 기능 사용
        //예:
        // if(dto.name){
        //     //..dto.name이 null이 아닐때 수행..
        // }
        return this.authService.signup(dto);
    }

    //HttpCode Decorator로 response status를 관리자가 변경할 수 있음(보안?)
    @HttpCode(HttpStatus.OK) // 201 Created -> 200 OK
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

    @Patch('delete/:id')
    deleteAccount(@Param('id') email: string) {
        return this.authService.deleteAccount(email);
    }
}