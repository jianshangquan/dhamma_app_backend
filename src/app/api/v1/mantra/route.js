
// https://www.bawdiwiki.com/

import connectDB from "@/db/mongodb";
import JsonResponse from "@/model/json-response";
import Mantra from "@/model/mantra-operation";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){
    const { skip = 0, limit = 10 } = Utils.searchParams(request.url);
    const mantras = await Mantra.find({ skip, limit });
    return JsonResponse.success({ data: mantras }).build();
}



export async function POST(request, { param }){
    const data = await request.json();
    const save = await Mantra.save({ data: new Mantra(data) });
    return JsonResponse.success({ data: save }).build();
}


