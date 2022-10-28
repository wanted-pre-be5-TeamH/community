import { Injectable } from "@nestjs/common";
import { User, Board } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    // test(){}
    constructor(private prisma: PrismaService){

    }
    signup(){
        return { msg: 'I have signed up'}
    }

    signin(){
        return { msg: 'I have signed in'}
    }

}