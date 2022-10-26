import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UsersModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
