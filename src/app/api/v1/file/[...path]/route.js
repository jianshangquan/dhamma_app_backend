import fs from 'fs';
import path from 'path';
// import { Response } from 'next/server';

const APP_DATA = process.env.NEXT_APP_DIR;

export async function GET(request, { params }){
    const { path } = params;
    const file = `${APP_DATA}/public/${path.join('/')}`;
    const stream = fs.createReadStream(file);
    return new Response(stream);
}