
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import PlayList from "@/model/playlist-model";
import Utils from "@/utils/Utils";



export async function GET(request, { param }){

    const { skip, limit = 10 } = Utils.searchParams(request.url);

    return JsonResponse.success({ 
        data: [ new PlayList.video() ]
    }).build();
}



