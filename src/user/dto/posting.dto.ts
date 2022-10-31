import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostingDto {
    // notice, free, management
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    like?: number;

    isDeleted?: boolean;
}