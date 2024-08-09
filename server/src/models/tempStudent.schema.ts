import mongoose, { Schema, Document, Model } from 'mongoose';
import ITempStudents from './schema-Interface/tempStudent.interface';

const tempStudentSchema: Schema<ITempStudents> = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
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
    address: {
        type: String,
        required: true,
        trim: true
    }
});

const tempStudentsDB: Model<ITempStudents> = mongoose.model<ITempStudents>("tempStudent", tempStudentSchema);
export default tempStudentsDB;