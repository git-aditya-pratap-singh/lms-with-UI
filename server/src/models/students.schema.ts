import mongoose, { Schema, Document, Model } from 'mongoose';
import IStudents from './schema-Interface/studentsSchema.interface';

const studentSchema: Schema<IStudents> = new Schema({
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
        ref: 'course', 
        required: true
    }],
    status: {
        type: String,
        enum:['Enabled','Disabled'],
        default: 'Enabled'
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    img_url: {
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
    }
});

const studentsDB: Model<IStudents> = mongoose.model<IStudents>("student", studentSchema);
export default studentsDB;