
// https://www.bawdiwiki.com/

import Audio from "@/model/audio-operation";
import JsonResponse from "@/model/json-response";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){

    const { skip, limit = 10 } = Utils.searchParams(request.url);

    const data = await Audio.find();
    return JsonResponse.success({  data: data }).build();
}



export async function POST( request, { param }){
    const body = await request.json();
    const save = await Audio.save({ data: new Audio(body) });
    return JsonResponse.success({ data: save }).build();
}