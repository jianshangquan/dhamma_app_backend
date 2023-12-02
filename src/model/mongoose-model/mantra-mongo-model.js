import mongoose from 'mongoose';

export const MantraSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    mantra: String,
    defination: String,
    coverUrl: String,
    createdDate: Date,
    serverTime: { type: Date, default: () => new Date() }
});


const MantraModel = mongoose.models?.mantras || new mongoose.model('mantras', MantraSchema);

export default MantraModel;