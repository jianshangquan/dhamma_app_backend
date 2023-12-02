
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Video from "@/model/video-operation";
import shortid from "shortid";



export async function GET(request, { param }){

    return JsonResponse.success({ 
        data: new Video(),
    }).build();
}