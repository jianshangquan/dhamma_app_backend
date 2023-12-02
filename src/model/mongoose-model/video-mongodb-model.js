import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    mantra: String,
    defination: String,
    url: String,
    coverUrl: String,
    bishop: String,
    coverUrl: String,
    thumbnail: String,
    createdDate: { type: Date, default: () => new Date() },
    serverTime: { type: Date, default: () => new Date() },
    year: Number,    
    duration: Number,
});


const VideoModel = mongoose.models.videos || new mongoose.model('videos', VideoSchema);
export default VideoModel;