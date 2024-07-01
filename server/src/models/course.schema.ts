import mongoose, { Schema, Document, Model } from 'mongoose';
import ICourse from './schema-Interface/courseSchema.interface';

const courseSchema: Schema<ICourse> = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    estimated_price: {
        type: Number,
        required: true,
        trim: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    categories: {
        type: String,
        required: true,
        trim: true 
    },
    level: {
        type: String,
        required: true,
        trim: true 
    },
    video_title: {
        type: String,
        required: true,
        trim: true 
    },
    video_platform_url: {
        type: String,
        trim: true 
    },
    source_code_url: {
        type: String,
        trim: true 
    },
    benefits: {
        type: String,
        required: true,
        trim: true 
    },
    faculty: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    video_uploaded_url: {
        type: String,
        required: true,
        trim: true 
    },
    course_logo_url: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum:['Enabled','Disabled'],
        default: 'Enabled'
    },
    last_insert_time: {
        type: Date,
        default: Date.now
    },
    admin_logs: {
        type: String,
        required: true,
        trim: true
    }
});

const courseDB: Model<ICourse> = mongoose.model<ICourse>("course", courseSchema);
export default courseDB;