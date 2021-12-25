import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTuitDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 280)
    content: string;

    
}