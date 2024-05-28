import { Document, Types } from 'mongoose';

export default interface ICourse extends Document {
    name: string;
    description: string; 
    price: number;
    estimated_price: number;
    tags: string[]; 
    categories: string;
    level: string;
    video_title: string;
    video_platform_url: string;
    source_code_url: string;
    benefits: string; 
    faculty: Types.ObjectId[]; 
    video_uploaded_url: string;
    course_logo_url: string;
    status: 'Enabled' | 'Disabled';
    last_insert_time: Date;
    admin_logs: string;
}