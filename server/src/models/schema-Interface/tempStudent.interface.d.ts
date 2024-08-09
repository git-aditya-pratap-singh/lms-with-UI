import {Document, Types} from 'mongoose';

export default interface ITempStudents extends Document {
    name: string;
    email: string;
    phone: string;
    gender: string;
    course: Types.ObjectId[];
    address: string;
}