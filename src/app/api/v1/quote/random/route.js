


import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-operation';

export async function GET(request, { params }) {

    const { skip, limit } = Utils.searchParams(request.url);
    const quote = await Quote.getRandom();
    // console.log('random quote', quote, skip,limit);

    return JsonResponse.success({ data: quote }).build();

    // const { skip, limit } = Utils.searchParams(request.url);
    // console.log('skip', skip, 'limit', limit)
    // const data = await Quote.find({ skip, limit });
    // return JsonResponse.success({
    //     data:data
    // }).build()
}

