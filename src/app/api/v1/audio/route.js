
// https://www.bawdiwiki.com/

import Audio from "@/model/audio-model";
import JsonResponse from "@/model/json-response";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){

    const { skip, limit = 10 } = Utils.searchParams(request.url);

    return JsonResponse.success({ 
        data: [ new Audio() ]
    }).build();
}



