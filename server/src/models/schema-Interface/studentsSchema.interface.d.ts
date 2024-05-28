import {Document, Types} from 'mongoose';

export default interface IStudents extends Document {
    username: string;
    name: string;
    password: string;
    email: string;
    phone: string;
    gender: string;
    course: Types.ObjectId[];
    status: string;
    address: string;
    img_url: string;
    last_login: Date;
    admin_logs: string;
}