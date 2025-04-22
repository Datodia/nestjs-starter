import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/enums/roles.enum";

@Schema({timestamps: true})
export class User {
    @Prop({type: String})
    name: string

    @Prop({type: String, required: true})
    email: string

    @Prop({type: String, select: false})
    password: string

    @Prop({type: String, enum: Role, default: Role.STUDENT})
    role: string
}

export const userSchema = SchemaFactory.createForClass(User)