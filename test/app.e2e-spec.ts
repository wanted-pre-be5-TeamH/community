import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

//초기화 후 새로 작성
describe('App e2e', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();
  })
  it.todo('should pass');
})