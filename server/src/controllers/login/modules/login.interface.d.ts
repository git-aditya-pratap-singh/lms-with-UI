import { Schema, Types } from 'mongoose';

export default interface IUser {
    _id: Schema.Types.ObjectId;
    username: string;
    name: string;
    password: string;
    designation: string;
    status: string;
    hasAllAccess: number;
}