"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth2_1 = require("passport-google-oauth2");
class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth2_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile']
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const data = {
            email: profile.email,
            fullName: profile.displayName,
            avatar: profile.picture
        };
        done(null, data);
    }
}
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map