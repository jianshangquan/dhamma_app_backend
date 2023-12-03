
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Video from "@/model/video-operation";
import shortid from "shortid";
import fs from 'fs';


const APP_DATA = process.env.NEXT_APP_DIR;


export async function GET(request, { params }){
    const { id } = params;
    const video = await Video.findById(id);
    return JsonResponse.success({ data: video }).build();
}


export async function DELETE(request, { params }){
    const { id } = params;
    const video = await Video.deleteById(id);
    const folder = video.url.substring(0, video.url.indexOf('/'));
    fs.rmSync(`${APP_DATA}public/${folder}`, { recursive: true });
    return JsonResponse.success({ data: video }).build();
}