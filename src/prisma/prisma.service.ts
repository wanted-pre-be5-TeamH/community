import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    //PrismaClient를 상속함으로써 DB 접근할 수 있음
    constructor(config : ConfigService){
        super({
            datasources:{
                db:{
                    // url: 'postgresql://postgres:1234qwer!@localhost:5434/nest?schema=public'
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }

    // e2e 테스트 시, db 클리어
    cleanDb() {
        return this.$transaction([
            this.user.deleteMany(),
            this.board.deleteMany(),
        ])
    }
}
