
// https://www.bawdiwiki.com/

import Audio from "@/model/audio-operation";
import JsonResponse from "@/model/json-response";
import PlayList from "@/model/playlist-model";
import Utils from "@/utils/Utils";



export async function GET(request, { param }){

    const { skip, limit = 10 } = Utils.searchParams(request.url);

    const data = await Audio.getAudiosByBishop();

    return JsonResponse.success({ 
        data: data
    }).build();
}



