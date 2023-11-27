
// https://www.bawdiwiki.com/

import JsonResponse from "@/model/json-response";
import Utils from "@/utils/Utils";
import shortid from "shortid";



export async function GET(request, { param }){

    const { skip, limit = 10 } = Utils.searchParams(request.url);

    return JsonResponse.success({ 
        data: [
            {
                id: shortid(),
                title: "",
                count: 10,
                createdDate: new Date(),
                songs: []
            },
        ]
    }).build();
}



