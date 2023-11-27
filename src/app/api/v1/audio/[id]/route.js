
// https://www.bawdiwiki.com/

import Audio from "@/model/audio-model";
import JsonResponse from "@/model/json-response";
import shortid from "shortid";



export async function GET(request, { param }){

    return JsonResponse.success({ 
        data: new Audio()
    }).build();
}