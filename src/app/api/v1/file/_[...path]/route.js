import JsonResponse from '@/model/json-response';
import fs from 'fs';
import path from 'path';
import { headers } from '../../../../../../next.config';
import { NextResponse } from 'next/server';
import mime from 'mime/lite';
// import { Response } from 'next/server';

const APP_DATA = process.env.NEXT_APP_DIR;

export async function GET(request, { params }) {
    const { path } = params;
    const file = `${APP_DATA}/public/${path.join('/')}`;
    const fileExists = fs.existsSync(file);

    if(!fileExists) 
        return JsonResponse.error({ message: 'File does not exist' }).build();

    const range = request.headers.get('range');
    const videoSize = fs.statSync(file).size;
    if (range) {
        console.log("request file as range");
        const CHUNK_SIZE = 10 ** 6 // 1MB;
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
        console.log("request file as download");
        const stream = fs.createReadStream(file);
        return new Response(stream, {
            headers: {
                'Content-Disposition': 'attachment;',
                "Accept-Ranges": "bytes",
                'Cache-Control': 'no-cache',
                'x-ratelimit-limit': 60,
                'x-ratelimit-remaining': 59,
                "Content-Length": videoSize,
                'Content-Type': mime.getType(file),
                'X-Content-Type-Options': 'nosniff',
                'Last-Modified': new Date(),
                'Upgrade': 'h2,h2c',
                'Keep-Alive': 'timeout=3, max=100',
                'Connection': 'Upgrade, Keep-Alive'
            }
        });
    }
}