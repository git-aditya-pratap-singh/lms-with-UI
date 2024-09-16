import mongoose, { Schema, Document, Model } from 'mongoose';
import ITeachers from './schema-Interface/teacherSchema.interface';

const teacherSchema: Schema<ITeachers> = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    course: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    status: {
        type: String,
        enum:['Active','Inactive'],
        default: 'Active'
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    imgUrl: {
        type: String,
        required: true,
        trim: true
    },
    last_login: {
        type: Date,
        default: Date.now
    },
    admin_logs: {
        type: String,
        required: true,
        trim: true
    },
    registeredMonth: {
        type: String,
        default: new Date().toLocaleString('en-US', { month: 'long' })
    }
});

const teachersDB: Model<ITeachers> = mongoose.model<ITeachers>("teacher", teacherSchema);
export default teachersDB;