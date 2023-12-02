
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Mantra from "@/model/mantra-operation";
import shortid from "shortid";



export async function GET(request, { param }){

    return JsonResponse.success({ 
        data: new Mantra()
    }).build();
}