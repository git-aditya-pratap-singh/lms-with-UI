import mongoose, { Schema, Document, Model } from 'mongoose';

interface Itags extends Document {
    name: string;
    status: "Enabled" | "Disabled";
}

const tagSchema: Schema<Itags> = new Schema({
    
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    status: {
        type: String,
        enum:['Enabled','Disabled'],
        default: 'Enabled'
    }
});

const tagsDB: Model<Itags> = mongoose.model<Itags>("tag", tagSchema);
export default tagsDB;
