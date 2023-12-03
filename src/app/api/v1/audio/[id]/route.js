
// https://www.bawdiwiki.com/

import Audio from "@/model/audio-operation";
import JsonResponse from "@/model/json-response";
import shortid from "shortid";
import fs from 'fs';


const APP_DATA = process.env.NEXT_APP_DIR;


export async function GET(request, { params }){
    const { id } = params;
    const audio = await Audio.findById(id);
    return JsonResponse.success({  data: audio }).build();
}


export async function DELETE(request, { params }){
    const { id } = params;
    const audio = await Audio.deleteById(id);
    const folder = audio.coverUrl.substring(0, audio.coverUrl.indexOf('/'));
    fs.rmSync(`${APP_DATA}public/${folder}`, { recursive: true });
    return JsonResponse.success({ data: audio }).build();
}

