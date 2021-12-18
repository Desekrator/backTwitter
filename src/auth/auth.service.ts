import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EncodeService } from './enconde.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';
import { v4 as uuidv4 } from 'uuid';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private encodeService: EncodeService,
        private jwtService: JwtService,
    ) { }



    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {

        const { name, email, password } = registerUserDto;
        const hashedPassword = await this.encodeService.encodePassword(password);


        return this.userRepository.createUser(name, email, hashedPassword, uuidv4());
    }

    async loginUser(loginDto: LoginDto): Promise<{ accessToken: string }> {

        const { email, password } = loginDto;
        const user = await this.userRepository.findOneByEmail(email);
        const isPasswordValid = await this.encodeService.checkPassword(password, user.password);

        if (!isPasswordValid || !user) {
            throw new UnauthorizedException('Check your credentials');
        }

        const payload: JwtPayload = { id: user.id, email: user.email, active: user.active };

        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };

    }

    async activateUser(activateUserDto: ActivateUserDto): Promise<void> {
        const { id, token } = activateUserDto;
        const user: User = await this.userRepository.findOneInactiveByIdAndAndActivationToken(id, token);

        if (!user) {
            throw new UnprocessableEntityException('Action not allowed');
        }

        return this.userRepository.activateUser(user);

    }

    async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto): Promise<void> 
    {
        const { email } = requestResetPasswordDto;
        const user: User = await this.userRepository.findOneByEmail(email);
        user.resetPasswordToken = uuidv4();
        this.userRepository.save(user);
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> 
    {
        const { resetPasswordToken, password } = resetPasswordDto;
        const user: User = await this.userRepository.findOneByResetPasswordToken(resetPasswordToken);
        user.password = await this.encodeService.encodePassword(password);
        user.resetPasswordToken = null;
        this.userRepository.save(user);
        
    }

}
