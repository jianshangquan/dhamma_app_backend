import JsonResponse from '@/model/json-response';
import fs from 'fs';
import path from 'path';
// import { Response } from 'next/server';

const APP_DATA = process.env.NEXT_APP_DIR;

export async function GET(request, { params }) {
    const { path } = params;
    const file = `${APP_DATA}/public/${path.join('/')}`;
    const fileExists = fs.existsSync(file);

    if(!fileExists) 
        return JsonResponse.error({ message: 'File does not exist' }).build();

    const range = request.headers.get('range');
    if (range) {
        const videoSize = fs.statSync(file).size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const stream = fs.createReadStream(file, { start, end });
        const response = new Response(stream, {
            status: 206,
            headers: {
                'Content-Disposition': 'inline',
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
            }
        });
        return response;
    } else {
        const stream = fs.createReadStream(file);
        return new Response(stream);
    }
}