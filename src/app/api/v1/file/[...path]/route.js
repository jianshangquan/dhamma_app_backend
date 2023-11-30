import fs from 'fs';
import path from 'path';
// import { Response } from 'next/server';

export async function GET(request, { params }){
    const { path } = params;
    const file = `/Users/jianshangquan/App Developemnt/Project/Dhamma/dhamma_app_backend/data/${path.join('/')}`;
    const stream = fs.createReadStream(file);
    return new Response(stream);
}