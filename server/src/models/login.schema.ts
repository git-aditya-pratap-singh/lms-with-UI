import mongoose, { Schema, Document, Model } from 'mongoose';

interface ILogin extends Document{
    username: string;
    name: string;
    password: string;
    designation: string;
    email: string;
    phone: string;
    status: "Enabled" | "Disabled";
    hasAllAccess: 0 | 1;
    last_login: Date;
}

const loginSchema: Schema<ILogin> = new Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    name:{
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    designation:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum:['Enabled','Disabled'],
        required: true,
    },
    hasAllAccess:{
        type: Number,
        enum:[0,1],
        required: true,
        trim: true
    },
    last_login:{
        type: Date,
        required: true,
        trim: true
    }
});

const loginDB: Model<ILogin> = mongoose.model<ILogin>("login", loginSchema);
export default loginDB;
