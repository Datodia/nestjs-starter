import { Model } from 'mongoose';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signIn({ email, password }: SignInDto): Promise<{
        accessToken: string;
    }>;
    signInWithGoogle(user: any): Promise<string>;
    signUp({ email, fullName, password }: SignUpDto): Promise<string>;
    getCurrentUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
