import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt2' //Auth guard 의 키워드, 기본값은 jwt
) {
    constructor(
        config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            // request에 jwt토큰이 없으면 unauthorization 에러 발생
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    //payload를 리턴해줌으로써 token으로 데이터 확인 가능. JwtStrategy쓰는 경우 validate 메소드 필수
    async validate(payload: {
        sub: number;
        email: string;
    }) {
        // console.log({
        //     payload,
        // })

        //user object가 리턴되지 않을 경우 unAuthorization 에러 발생
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            }
        });
        //비번 같은 개인정보는 리턴하지 않음
        delete user.hash;
        return user;
    }
}