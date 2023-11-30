
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Video from "@/model/video-model";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){

    const { skip, limit } = Utils.searchParams(request.url);


    const data = await Video.find();
    return JsonResponse.success({ data: data }).build();
}




export async function POST(request, { param }){
    const body = await request.json();
    const video = new Video(body);
    return JsonResponse.success({ data: await Video.save({ data: video }) }).build();
}