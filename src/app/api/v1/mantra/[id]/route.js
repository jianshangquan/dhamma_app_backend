
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Mantra from "@/model/mantra-operation";
import shortid from "shortid";
import fs from 'fs';


const APP_DATA = process.env.NEXT_APP_DIR;


export async function GET(request, { params }){
    const { id } = params;
    const mantra = await Mantra.findById(id);
    return JsonResponse.success({ data: mantra }).build();
}


export async function DELETE(request, { params }){
    const { id } = params;
    const mantra = await Mantra.deleteById(id);
    const folder = mantra.coverUrl.substring(0, mantra.coverUrl.indexOf('/'));
    fs.rmSync(`${APP_DATA}public/${folder}`, { recursive: true });
    return JsonResponse.success({ data: mantra }).build();
}

