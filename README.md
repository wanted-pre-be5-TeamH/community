# community
프로젝트 목적 : 회원 관리, 게시판, 통계 서비스 구현

개발 과정 정리 Notion Link : https://mellow-deer-e21.notion.site/1-2ca0fe54913d48db832e83ccfc5e1467

## 백엔드 프로젝트 구성

1) 서버 : Nestjs
2) DB : PostgreSQL (Docker)
3) ORM : Prisma
4) Unit Test : Pactum

## ERD 설계
-

## API 명세

| INDEX | METHOD | URI | DESCRIPTION | REMARK |
| --- | --- | --- | --- | --- |
| 1 (O) | POST | /auth/signup | 회원 가입 |  |
| 2 (O) | POST | /auth/signin | 로그인 |  |
| 3 (O) | PATCH | /auth/delete/:id | 회원 탈퇴 |  |
| 4 (O) | GET | /users/me | 내 정보 조회 |  |
| 5 (△) | POST | /users/createPosting | 게시글 작성 | 회원 등급에 따른 기능 접근 제어 |
| 6 (△) | GET | /users/:id | 게시글 조회 | 회원 등급에 따른 기능 접근 제어 |
| 7 (△) | PATCH | /users/updatePosting/:id | 게시글 업데이트 | 회원 등급에 따른 기능 접근 제어 |
| 8 (△) | PATCH | /users/deletePosting/:id | 게시글 삭제 | 회원 등급에 따른 기능 접근 제어 |
| 9 (X) | GET | /posting/:sex | 남/여 별 사용 집계 |  |
| 10 (X) | GET | /posting/:age | 나이 별 사용 집계 |  |
| 11 (X) | GET | /posting/:accessedAt | 접속 시간 별 사용 집계 |  |
