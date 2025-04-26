"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signIn({ email, password }) {
        const existUser = await this.userModel.findOne({ email }).select('+password');
        if (!existUser)
            throw new common_1.BadRequestException('Invalid Credentials');
        const isPassedEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassedEqual)
            throw new common_1.BadRequestException('Invalid Credentials');
        const payLoad = {
            id: existUser._id,
            role: existUser.role
        };
        const accessToken = await this.jwtService.sign(payLoad, { expiresIn: '1h' });
        return { accessToken };
    }
    async signInWithGoogle(user) {
        let existsUser = await this.userModel.findOne({ email: user.email });
        if (!existsUser) {
            existsUser = await this.userModel.create({
                email: user.email,
                avatar: user.avatar,
                fullName: user.fullName
            });
        }
        existsUser.avatar = user.avatar;
        await existsUser.save();
        const payLoad = {
            id: existsUser._id,
            role: existsUser.role
        };
        const accessToken = await this.jwtService.sign(payLoad, { expiresIn: '1h' });
        return accessToken;
    }
    async signUp({ email, fullName, password }) {
        const existUser = await this.userModel.findOne({ email: email });
        if (existUser)
            throw new common_1.BadRequestException('User Already exists');
        const hashedPass = await bcrypt.hash(password, 10);
        await this.userModel.create({ email, password: hashedPass, fullName });
        return 'user created successfully';
    }
    async getCurrentUser(userId) {
        return await this.userModel.findById(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map