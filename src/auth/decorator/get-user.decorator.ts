import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined,
    ctx: ExecutionContext) => {
    // ctx - Http, WebSocket 등 변경 가능
    // getReq, Res 등 변경 가능
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data]
    }
    return request.user;
  },
);