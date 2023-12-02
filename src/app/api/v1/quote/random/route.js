


import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-operation';

export async function GET(request, { params }) {


    const quote = await Quote.getRandom();

    return JsonResponse.success({ data: quote }).build();
}

