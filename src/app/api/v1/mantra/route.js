
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

    const mantras = await Mantra.find();
    return JsonResponse.success({ data: mantras }).build();
}



export async function POST(request, { param }){
    const data = await request.json();
    const save = await Mantra.save({ data: new Mantra(data) });
    return JsonResponse.success({ data: save }).build();
}



// export async function GET(request, { param }){
//     return JsonResponse.success({ data: {} }).build()
// }

