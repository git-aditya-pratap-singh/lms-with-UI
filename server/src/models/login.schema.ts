import mongoose, { Schema, Document, Model } from 'mongoose';
import ILogin from './schema-Interface/loginSchema.interface';

const loginSchema: Schema<ILogin> = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum:['Male','Female'],
        required: true
    },
    address: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        enum:['Enabled','Disabled'],
        default: 'Enabled'
    },
    hasAllAccess: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    loginOtp: {
        type: Number,
        trim: true
    },
    forgetPswdOtp: {
        type: Number,
        trim: true
    },
    otpToken: {
        type: String,
        trim: true
    },
    last_login: {
        type: Date,
        default: Date.now()
    }
});

const loginDB: Model<ILogin> = mongoose.model<ILogin>("login", loginSchema);
export default loginDB;
