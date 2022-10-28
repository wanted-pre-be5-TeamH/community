-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "loginId" TEXT,
    "password" TEXT,
    "name" TEXT,
    "grade" TEXT,
    "sex" TEXT,
    "age" INTEGER,
    "phone" TEXT,
    "accessedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT,
    "title" TEXT,
    "content" TEXT,
    "authorId" TEXT,
    "like" INTEGER,
    "isDeleted" BOOLEAN,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
