import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Board } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    // test(){}
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {

    }

    // REST API 기능 1. 회원 가입
    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash : hash,
                    name : dto.name,
                    grade : dto.grade,
                    sex : dto.sex,
                    age: parseInt(dto.age),
                    phone : dto.phone,
                    isDeleted: false,
                },
            })
            // delete user.hash;
            // return the saved user
            //user를 리턴하지 않고 token을 리턴
            return this.signToken(user.id, user.email);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                //duplicate pk column data
                if (err.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    )
                }
            }
            throw err;
        }
    }

    // REST API 기능 2. 로그인
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException('Credential incorrect');

        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password);
        //if password incorrect throw exception
        if (!pwMatches)
            throw new ForbiddenException('Credential incorrect');

        //send back the user
        // delete user.hash;

        //user를 리턴하지 않고 token을 리턴
        return this.signToken(user.id, user.email);
    }


    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload,
            {
                expiresIn: '15m',
                secret: secret,
            })
        return {
            access_token: token
        }
    }

    // REST API 기능 3. 회원 탈퇴
    async deleteAccount(email: string) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    isDeleted: true,
                },
            })
            return user;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                console.log(`Delete Account Err : ${err}`)
            }
            throw err;
        }
    }
}