import mongoose from 'mongoose';

const AudioSchema = new mongoose.Schema({
    title: String,
    description: String,
    mantra: String,
    defination: String,
    url: String,
    bishop: String,
    coverUrl: String,
    thumbnail: String,
    duration: Number,
    createdDate: { type: Date, default: () => new Date() },
    serverTime: { type: Date, default: () => new Date() }
});


const AudioModel = mongoose.models.audios || new mongoose.model('audios', AudioSchema);
export default AudioModel;