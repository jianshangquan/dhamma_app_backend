
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Mantra from "@/model/mantra-model";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){

    const { skip, limit } = Utils.searchParams(request.url);

    // return JsonResponse.success({ 
    //     data: [ new Mantra() ]
    // }).build();

    return JsonResponse.success({ data: {} }).build();
}




// export async function GET(request, { param }){
//     return JsonResponse.success({ data: {} }).build()
// }

