import { Document } from 'mongoose';

export default interface ILogin extends Document {
    username: string;
    name: string;
    password: string;
    designation: string;
    email: string;
    phone: string;
    status: "Enabled" | "Disabled";
    hasAllAccess: 0 | 1;
    last_login: Date;
}