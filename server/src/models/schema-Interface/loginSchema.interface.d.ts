import { Document } from 'mongoose';

export default interface ILogin extends Document {
    username: string;
    name: string;
    password: string;
    designation: string;
    email: string;
    phone: string;
    dob: Date;
    gender: "Male" | "Female";
    address: string;
    status: "Enabled" | "Disabled";
    hasAllAccess: true | false;
    last_login: Date;
}