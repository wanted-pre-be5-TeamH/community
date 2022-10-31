import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

//초기화 후 새로 작성
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService

  // Starting Logic
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3333);

    // prisma = app.get(PrismaService)
    // await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');

  });

  // Down Logic
  afterAll(() => {
    app.close();
  })

  describe('Auth', () => {
    describe('Signup', () => {
      // it.todo('should signup');
      it('should signup', () => {
        const dto: AuthDto = {
          email: 'testuser@test.com',
          password: '1234',
          name: '테스트',
          grade: 'admin',
          sex: 'male',
          age: '11',
          phone: '010-1234-5678',
          isDeleted: false,
        }
        return pactum.spec().post('/auth/signup',
        ).withBody(dto)
          .expectStatus(201);
        // .inspect()
      });

    });
    describe('Signin', () => {
      // it.todo('should signin')
      it('should signin', () => {
        const dto: AuthDto = {
          email: 'testuser@test.com',
          password: '1234',
          name: '테스트',
          grade: 'admin',
          sex: 'male',
          age: '11',
          phone: '010-1234-5678',
          isDeleted: false,
        }
        return pactum.spec().post('/auth/signin',
        ).withBody(dto)
          .expectStatus(201);
        // .inspect()
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => { });
    describe('Create Posting', () => { });
    describe('Get Posting by id', () => { });
    describe('Edit Posting', () => { });
    describe('Delete Posting', () => { });
  })

  it.todo('should pass');
})

