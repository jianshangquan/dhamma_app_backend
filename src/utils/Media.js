
// import ffprobe from '@ffprobe-installer/ffprobe';
// import videoDuration from 'get-video-duration';
import ffprobe from 'ffprobe';


const FFPROBE = process.env.NEXT_FFPROBE;

export default {
    async getDurationFromMimeType(filePath, mime = ''){
        if(!(mime.includes('video') || mime.includes('audio')))
            return null;

        const prob = await ffprobe(filePath, { path: FFPROBE });
        const streams = prob.streams.filter(stream => {
           return stream.codec_type == 'audio' || stream.codec_type || 'video'
        })
        if(streams.length == 0) 
            return 0;

        return Number(streams[0].duration);
    }
}