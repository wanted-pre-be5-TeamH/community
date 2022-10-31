import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from '../prisma/prisma.service';
import { PostingDto } from "./dto/posting.dto";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
    ) {

    }

    // REST API 기능 4. 게시판 글 작성 
    // (type : 공지사항 = notice, 자유게시판 = free, 운영게시판 = management)
    async createPosting(userId: number, dto: PostingDto) {
        try {
            const posting = await this.prisma.board.create({
                data: {
                    userId,
                    ...dto
                },
            })
            return posting;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                console.log(`Write Posting Err : ${err}`)
            }
            throw err;
        }
    }
    // REST API 기능 5. 게시판 글 조회
    async getPostingById(userId: number, id: number) {
        const posting = await this.prisma.board.findFirst({
            where: {
                id: id,
                userId,
            }
        });
        return posting;
    }

    // REST API 기능 6. 게시판 글 수정
    async updatePostingById(userId: number, id: number) {
        const posting = await this.prisma.board.update({
            where: {
                id: id,
            },
            data: {

            }
        });
        return posting;
    }

    // REST API 기능 7. 게시판 글 삭제
    async deletePostingById(userId: number, id: number) {
        const posting = await this.prisma.board.update({
            where: {
                id: id,
            },
            data:{
                isDeleted: true
            }
        });
        return posting;
    }
}