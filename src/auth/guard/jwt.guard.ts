import { AuthGuard } from "@nestjs/passport";

//custom guard 정의
export class JwtGuard extends AuthGuard('jwt2') {
    constructor() {
        super();
    }
}