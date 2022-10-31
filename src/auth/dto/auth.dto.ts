import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    // super, admin, normal
    @IsString()
    @IsNotEmpty()
    grade: string;

    // male, female
    @IsString()
    @IsNotEmpty()
    sex: string;

    @IsString()
    @IsNotEmpty()
    age: string;

    //010-1234-5678
    @IsString()
    @IsNotEmpty()
    phone: string;

    accessedAt?: Date;

    isDeleted: boolean;
}