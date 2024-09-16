import mongoose, { Schema, Document, Model } from 'mongoose';
import IStudents from './schema-Interface/studentsSchema.interface';

const studentSchema: Schema<IStudents> = new Schema({
    username: {
        type: String,
        lowercase: true,
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

const studentsDB: Model<IStudents> = mongoose.model<IStudents>("student", studentSchema);
export default studentsDB;