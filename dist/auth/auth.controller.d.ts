import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleRedirect(req: any, res: any): Promise<any>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    signUp(signUpDto: SignUpDto): Promise<string>;
    currentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/entities/user.entity").User> & import("../users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
