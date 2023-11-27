
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Video from "@/model/video-model";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){

    const { skip, limit } = Utils.searchParams(request.url);

    return JsonResponse.success({ 
        data: [ new Video() ]
    }).build();
}